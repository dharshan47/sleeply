import { verifyCronAuth } from "@/lib/cron-auth.ts";
import { sendMonthlyMail, getMonthlySleepStats } from "@/scripts/index.ts";

export async function GET(req: Request) {
  if (!verifyCronAuth(req)) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    // 📅 Calculate last month
    const now = new Date();
    const reportDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const month = reportDate.getMonth() + 1;
    const year = reportDate.getFullYear();
    const monthName = reportDate.toLocaleString("en-US", { month: "long" });

    // 📊 Get sleep stats (includes no-data users)
    const reports = await getMonthlySleepStats(year, month);

    if (!reports.length) {
      return Response.json({
        success: true,
        message: "No users found",
      });
    }

    let sent = 0;
    let failed = 0;

    // ✉️ Send emails safely
    await Promise.all(
      reports.map(async (report) => {
        try {
          await sendMonthlyMail({
            ...report,
            month: monthName,
          });
          sent++;
        } catch (err) {
          failed++;
        }
      }),
    );

    return Response.json({
      success: true,
      month: monthName,
      sent,
      failed,
    });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
