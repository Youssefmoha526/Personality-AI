import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { getAllPersonalityQuestions } from "@questions/personality/bank";
import { selectNextQuestion } from "@/lib/engines/question-engine";
import { createEmptyScoringState } from "@/lib/engines/scoring";
import { TARGET_PERSONALITY_QUESTIONS } from "@/lib/types";

const schema = z.object({
  language: z.enum(["en", "ar"]),
  statedGoal: z.string().optional(),
  displayName: z.string().optional(),
  age: z.number().int().min(13).max(120).optional(),
  nationality: z.string().optional(),
  guestToken: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = schema.parse(await req.json());
    const session = await auth();
    const allQuestions = getAllPersonalityQuestions(body.language);
    const properFirst = selectNextQuestion({
      language: body.language,
      answeredIds: new Set(),
      similarityGroups: new Set(),
      recentScenarioTypes: [],
      scoringState: createEmptyScoringState(),
      questionCount: 0,
      maxQuestions: TARGET_PERSONALITY_QUESTIONS,
      allQuestions,
    });

    const assessment = await prisma.assessmentSession.create({
      data: {
        userId: session?.user?.id,
        guestToken: body.guestToken ?? crypto.randomUUID(),
        language: body.language,
        statedGoal: body.statedGoal,
        displayName: body.displayName,
        age: body.age,
        nationality: body.nationality,
        maxQuestions: TARGET_PERSONALITY_QUESTIONS,
        status: "in_progress",
      },
    });

    const question = properFirst;
    if (!question) {
      return NextResponse.json({ error: "No questions available" }, { status: 500 });
    }

    return NextResponse.json({
      sessionId: assessment.id,
      question: {
        id: question.id,
        text: question.text,
        options: question.options,
        index: 1,
        total: TARGET_PERSONALITY_QUESTIONS,
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to start assessment" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("sessionId");
  if (!sessionId) return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });

  const assessment = await prisma.assessmentSession.findUnique({
    where: { id: sessionId },
    include: { answers: true },
  });
  if (!assessment) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const language = assessment.language as "en" | "ar";
  const allQuestions = getAllPersonalityQuestions(language);
  const answeredRecords = assessment.answers.map((a) => {
    const question = allQuestions.find((q) => q.id === a.questionId)!;
    return { questionId: a.questionId, optionIndex: a.optionIndex, question };
  }).filter((a) => a.question);

  const ctx = buildSelectionContext(allQuestions, answeredRecords, assessment.maxQuestions);
  const next = selectNextQuestion(ctx);

  if (!next && assessment.status !== "completed") {
    return NextResponse.json({ complete: true, sessionId });
  }

  return NextResponse.json({
    sessionId,
    status: assessment.status,
    answeredCount: assessment.answers.length,
    maxQuestions: assessment.maxQuestions,
    question: next
      ? {
          id: next.id,
          text: next.text,
          options: next.options,
          index: assessment.answers.length + 1,
          total: assessment.maxQuestions,
        }
      : null,
    complete: !next,
  });
}
