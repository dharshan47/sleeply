"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Record } from "@/types/types";
import { headers } from "next/headers";

export async function getRecord(): Promise<{
  records?: Record[];
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
      orderBy: {
        date: "desc",
      },
      take: 10,
    });
    return { records };
  } catch {
    return { error: "Database error" };
  }
}
