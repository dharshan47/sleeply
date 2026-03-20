"use server";


import { getSession } from "@/lib/auth-server";
import prisma from "@/lib/prisma";


export async function getBestWorstSleep(): Promise<{
  bestSleep?: number;
  worstSleep?: number;
  error?: string;
}> {
    
 const session = await getSession();

  const userId = session?.user?.id;

  if (!userId) {
    return { error: "User not found" };
  }

  try {
    const aggregates = await prisma.record.aggregate({
      where: {
        userId,
      },
      _max: {
        amount: true,
      },
      _min: {
        amount: true,
      },
    });

    const bestSleep = aggregates._max.amount ?? 0;
    const worstSleep = aggregates._min.amount ?? 0;

    return { bestSleep, worstSleep };
  } catch {
    return { error: "Database error" };
  }
}
