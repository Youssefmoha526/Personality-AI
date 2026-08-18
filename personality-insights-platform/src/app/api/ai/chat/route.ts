import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { chatWithAi, buildProfileFromResult } from "@/lib/ai/companion";
import type { PersonalityConstruct, StatedGoal } from "@/lib/types";

const schema = z.object({
  message: z.string().min(1).max(4000),
  conversationId: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const user = await requireUser();
    const body = schema.parse(await req.json());

    const latestResult = await prisma.personalityResult.findFirst({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    if (!latestResult) {
      return NextResponse.json(
        { error: "Complete a personality assessment first" },
        { status: 400 }
      );
    }

    const profile = await prisma.profile.findUnique({ where: { userId: user.id } });
    const dimensions = JSON.parse(latestResult.dimensions) as Record<
      PersonalityConstruct,
      { construct: PersonalityConstruct; score: number; confidence: number; evidenceCount: number }
    >;
    const sections = JSON.parse(latestResult.reportSections) as Record<string, string>;

    const aiProfile = buildProfileFromResult({
      displayName: profile?.displayName ?? "Friend",
      language: (profile?.language as "en" | "ar") ?? "en",
      statedGoal: (profile?.statedGoal as StatedGoal) ?? null,
      dimensions,
      overallConfidence: latestResult.overallConfidence,
      strengths: JSON.parse(latestResult.strengths),
      growthAreas: JSON.parse(latestResult.growthAreas),
      reportSections: sections,
    });

    let conversationId = body.conversationId;
    if (!conversationId) {
      const conv = await prisma.aiConversation.create({
        data: { userId: user.id, language: aiProfile.language },
      });
      conversationId = conv.id;
    }

    const history = await prisma.aiMessage.findMany({
      where: { conversationId },
      orderBy: { createdAt: "asc" },
      take: 20,
    });

    await prisma.aiMessage.create({
      data: { conversationId, role: "user", content: body.message },
    });

    const reply = await chatWithAi(
      aiProfile,
      [...history, { role: "user", content: body.message }].map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      }))
    );

    await prisma.aiMessage.create({
      data: { conversationId, role: "assistant", content: reply },
    });

    return NextResponse.json({ reply, conversationId });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Chat failed";
    const status = msg === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ error: msg }, { status });
  }
}
