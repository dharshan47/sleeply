"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export async function getUserRecord(): Promise<{
  record?: number;
  daysWithRecords?: number;
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
    });

    const record = records.reduce((sum, record) => sum + record.amount, 0);

    const daysWithRecords = records.filter(
      (record) => record.amount > 0
    ).length;

    return { record, daysWithRecords };
  } catch {
    return { error: "Database error" };
  }
}
