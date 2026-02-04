"use server";

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth-server";

export const getRecordCount = async (): Promise<number> => {
  const session = await getSession();
  const userId = session?.user?.id;

  if (!userId) return 0;
  const count = await prisma.record.count({
    where: { userId },
  });
  return count || 0;
};
