"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

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
    date = new Date(dateValue.toString()).toISOString();
  } catch {
    return { error: "Invalid date format" };
  }

  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: Object.fromEntries(headersList.entries()),
  });

  const userId = session?.user?.id;

  if (!userId) {
    return { error: "User not found" };
  }

  try {
    const existingRecord = await prisma.record.findFirst({
      where: {
        userId,
        date: date,
      },
    });

    let recordData: RecordData;

    if (existingRecord) {
      const upadtedRecord = await prisma.record.update({
        where: {
          id: existingRecord.id,
        },
        data: {
          text,
          amount,
        },
      });

      recordData = {
        text: upadtedRecord.text,
        amount: upadtedRecord.amount,
        date: upadtedRecord.date?.toISOString() || date,
      };
    } else {
      const createdRecord = await prisma.record.create({
        data: {
          text,
          amount,
          date,
          userId,
        },
      });

      recordData = {
        text: createdRecord.text,
        amount: createdRecord.amount,
        date: createdRecord.date?.toISOString() || date,
      };
    }
    revalidatePath("/sleep-tracker");
    
    return { data: recordData };
  } catch {
    return {
      error: "An unexpected error occurred while adding the sleep record.",
    };
  }
}
