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
    const records = await prisma.record.findMany({
      where: {
        userId,
      },
    });

    const record = records.reduce((sum, record) => sum + record.amount, 0);

    const daysWithRecords = records.filter(
      (record) => record.amount > 0,
    ).length;

    return { record, daysWithRecords };
  } catch {
    return { error: "Database error" };
  }
}
