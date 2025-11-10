"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function deleteRecord(recordId: string): Promise<{
  message?: string;
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
    await prisma.record.delete({
      where: {
        id: recordId,
        userId,
      },
    });
    revalidatePath("/sleep-tracker");
    return { message: "Record Deleted" };
  } catch {
    return { error: " Error while deleting from Database" };
  }
}
