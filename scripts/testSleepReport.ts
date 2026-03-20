import { sendMonthlyMail } from "./sendMonthlyMail";

async function run() {
  const email = process.argv[2] || process.env.TEST_EMAIL || "user@example.com";
  console.log(`Testing sleep report email delivery for: ${email}`);
  
  const now = new Date();
  const reportDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const monthName = reportDate.toLocaleString("en-US", { month: "long" });

  await sendMonthlyMail({
    email,
    name: "Test User",
    month: monthName,
    totalSleep: "42.0",
    avgSleep: "7.0",
    bestSleep: 9,
    worstSleep: 5,
    daysTracked: 6,
    noData: false,
  });
  console.log("✅ Test email sent successfully to", email);
}

run().catch((err) => {
  console.error("❌ Test email failed:", err);
  process.exit(1);
});
