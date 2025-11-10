"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export async function getBestWorstSleep(): Promise<{
  bestSleep?: number;
  worstSleep?: number;
  error?: string;
}> {
    
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: Object.fromEntries(headersList.entries()),
  });

  const userId = session?.user?.id;

  if (!userId) {
    return { error: "User not found" };
  }

  try {
    const records = await prisma.record.findMany({
      where: {
        userId,
      },
      select: {
        amount: true,
      },
    });

    if (!records || records.length === 0) {
      return { bestSleep: 0, worstSleep: 0 };
    }

    const amounts = records.map((record) => record.amount);

    const bestSleep = Math.max(...amounts);
    const worstSleep = Math.min(...amounts);

    return { bestSleep, worstSleep };
  } catch {
    return { error: "Database error" };
  }
}
