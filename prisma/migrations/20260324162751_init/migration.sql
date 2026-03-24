/*
  Warnings:

  - A unique constraint covering the columns `[userId,date]` on the table `Record` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Record_userId_idx";

-- CreateIndex
CREATE INDEX "Record_userId_date_idx" ON "Record"("userId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "Record_userId_date_key" ON "Record"("userId", "date");
