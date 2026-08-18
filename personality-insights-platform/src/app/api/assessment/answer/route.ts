import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getAllPersonalityQuestions, getQuestionById } from "@questions/personality/bank";
import { buildSelectionContext, selectNextQuestion, hasDuplicateQuestion } from "@/lib/engines/question-engine";
import { scoreFromAnswers, generateReport, overallConfidence } from "@/lib/engines/scoring";

const answerSchema = z.object({
  sessionId: z.string(),
  questionId: z.string(),
  optionIndex: z.number().int().min(0).max(5),
});

export async function POST(req: Request) {
  try {
    const body = answerSchema.parse(await req.json());
    const session = await prisma.assessmentSession.findUnique({
      where: { id: body.sessionId },
      include: { answers: true },
    });
    if (!session || session.status === "completed") {
      return NextResponse.json({ error: "Invalid session" }, { status: 400 });
    }

    const answeredIds = session.answers.map((a) => a.questionId);
    if (hasDuplicateQuestion(answeredIds, body.questionId)) {
      return NextResponse.json({ saved: true, duplicate: true });
    }

    const question = getQuestionById(body.questionId, session.language as "en" | "ar");
    if (!question || body.optionIndex >= question.options.length) {
      return NextResponse.json({ error: "Invalid question" }, { status: 400 });
    }

    await prisma.answer.upsert({
      where: {
        sessionId_questionId: {
          sessionId: body.sessionId,
          questionId: body.questionId,
        },
      },
      create: {
        sessionId: body.sessionId,
        questionId: body.questionId,
        optionIndex: body.optionIndex,
      },
      update: { optionIndex: body.optionIndex },
    });

    const updated = await prisma.assessmentSession.findUnique({
      where: { id: body.sessionId },
      include: { answers: true },
    });
    if (!updated) return NextResponse.json({ error: "Session lost" }, { status: 500 });

    const language = updated.language as "en" | "ar";
    const allQuestions = getAllPersonalityQuestions(language);
    const records = updated.answers
      .map((a) => {
        const q = allQuestions.find((x) => x.id === a.questionId);
        return q ? { questionId: a.questionId, optionIndex: a.optionIndex, question: q } : null;
      })
      .filter(Boolean) as Array<{ questionId: string; optionIndex: number; question: typeof allQuestions[0] }>;

    const ctx = buildSelectionContext(allQuestions, records, updated.maxQuestions);
    const next = selectNextQuestion(ctx);
    const shouldComplete = !next || records.length >= updated.maxQuestions;

    if (shouldComplete) {
      const dimensions = scoreFromAnswers(records);
      const report = generateReport(
        dimensions,
        language,
        updated.displayName ?? "",
        (updated.statedGoal as never) ?? null
      );
      const conf = overallConfidence(dimensions);

      await prisma.personalityResult.create({
        data: {
          sessionId: updated.id,
          userId: updated.userId,
          dimensions: JSON.stringify(dimensions),
          confidence: JSON.stringify(
            Object.fromEntries(Object.entries(dimensions).map(([k, v]) => [k, v.confidence]))
          ),
          summary: report.summary,
          strengths: JSON.stringify(report.strengths),
          growthAreas: JSON.stringify(report.growthAreas),
          distinctive: JSON.stringify(report.distinctive),
          reportSections: JSON.stringify(report.sections),
          overallConfidence: conf,
        },
      });

      await prisma.assessmentSession.update({
        where: { id: updated.id },
        data: { status: "completed", completedAt: new Date() },
      });

      if (updated.userId) {
        await prisma.assessmentHistory.create({
          data: {
            userId: updated.userId,
            resultId: updated.id,
            dimensions: JSON.stringify(dimensions),
            confidence: String(conf),
          },
        });
      }

      return NextResponse.json({ complete: true, sessionId: updated.id, resultId: updated.id });
    }

    return NextResponse.json({
      saved: true,
      question: next
        ? {
            id: next.id,
            text: next.text,
            options: next.options,
            index: records.length + 1,
            total: updated.maxQuestions,
          }
        : null,
    });
  } catch {
    return NextResponse.json({ error: "Failed to save answer" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const sessionId = new URL(req.url).searchParams.get("sessionId");
  if (!sessionId) return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });

  const result = await prisma.personalityResult.findUnique({
    where: { sessionId },
  });
  if (!result) return NextResponse.json({ error: "Result not found" }, { status: 404 });

  return NextResponse.json({
    summary: result.summary,
    dimensions: JSON.parse(result.dimensions),
    confidence: result.overallConfidence,
    strengths: JSON.parse(result.strengths),
    growthAreas: JSON.parse(result.growthAreas),
    distinctive: JSON.parse(result.distinctive),
    sections: JSON.parse(result.reportSections),
  });
}
