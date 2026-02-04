"use server";


import { getSession } from "@/lib/auth-server";
import prisma from "@/lib/prisma";
import { Record } from "@/types/types";


export async function getRecord(): Promise<{
  records?: Record[];
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
