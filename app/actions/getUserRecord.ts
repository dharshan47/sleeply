"use server";

import { getSession } from "@/lib/auth-server";
import prisma from "@/lib/prisma";

export async function getUserRecord(): Promise<{
  record?: number;
  daysWithRecords?: number;
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
        amount: { gt: 0 },
      },
      _sum: {
        amount: true,
      },
      _count: {
        _all: true,
      },
    });

    return {
      record: aggregates._sum.amount ?? 0,
      daysWithRecords: aggregates._count._all,
    };
  } catch {
    return { error: "Database error" };
  }
}
