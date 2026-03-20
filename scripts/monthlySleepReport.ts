import { getMonthlySleepStats } from "./getMonthlySleepStats.ts";
import { sendMonthlyMail } from "./sendMonthlyMail.ts";

async function run() {
  const now = new Date();
  const reportDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  const month = reportDate.getMonth() + 1;
  const year = reportDate.getFullYear();

  const monthName = reportDate.toLocaleString("en-US", {
    month: "long",
  });

  const reports = await getMonthlySleepStats(year, month);

  if (!reports.length) {
    return;
  }

  await Promise.all(
    reports.map((report) =>
      sendMonthlyMail({
        ...report,
        month: monthName,
      }),
    ),
  );

 
}

run().catch((err) => {
  console.error("❌ Monthly report failed:", err);
});
