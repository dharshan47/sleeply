"use server";

import { getSession } from "@/lib/auth-server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteRecord(recordId: string) {
  const session = await getSession();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const result = await prisma.record.deleteMany({
    where: {
      id: recordId,
      userId,
    },
  });

  if (result.count === 0) {
    throw new Error("Record not found");
  }

  revalidatePath("/sleep-tracker");
}
