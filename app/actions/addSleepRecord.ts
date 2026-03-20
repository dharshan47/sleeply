"use server";


import { getSession } from "@/lib/auth-server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";


interface RecordData {
  text: string;
  amount: number;
  date: string;
}

interface RecordResult {
  data?: RecordData;
  error?: string;
}

export async function addSleepRecord(
  formData: FormData
): Promise<RecordResult> {

  const textValue = formData.get("text");
  const amountValue = formData.get("amount");
  const dateValue = formData.get("date");

  if (
    !textValue ||
    textValue === "" ||
    !amountValue ||
    amountValue === "" ||
    !dateValue ||
    dateValue === ""
  ) {
    return { error: "Text ,amount or date is missing" };
  }

  const text: string = textValue.toString();
  const amount: number = parseFloat(amountValue.toString());
  let date: string;

  try {
    const d = new Date(dateValue.toString());
    // Normalize to midnight UTC to ensure one record per day
    date = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())).toISOString();
  } catch {
    return { error: "Invalid date format" };
  }

  
  const session = await getSession();

  const userId = session?.user?.id;

  if (!userId) {
    return { error: "User not found" };
  }

  try {
    const upsertedRecord = await prisma.record.upsert({
      where: {
        userId_date: {
          userId,
          date,
        },
      },
      update: {
        text,
        amount,
      },
      create: {
        userId,
        date,
        text,
        amount,
      },
    });

    const recordData: RecordData = {
      text: upsertedRecord.text,
      amount: upsertedRecord.amount,
      date: upsertedRecord.date.toISOString(),
    };

    revalidatePath("/sleep-tracker");
    return { data: recordData };
  } catch (err) {
    console.error("Upsert error:", err);
    return {
      error: "An unexpected error occurred while saving the sleep record.",
    };
  }
}
