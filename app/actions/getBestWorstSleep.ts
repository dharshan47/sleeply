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
