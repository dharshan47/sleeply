import prisma from "../lib/prisma";

export interface MonthlySleepReport {
  email: string;
  name: string; // make required
  totalSleep: string;
  avgSleep: string;
  bestSleep: number;
  worstSleep: number;
  daysTracked: number;
  noData: boolean; // always defined
}

export async function getMonthlySleepStats(
  year: number,
  month: number
): Promise<MonthlySleepReport[]> {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0, 23, 59, 59);

  const users = await prisma.user.findMany({
    include: {
      records: {
        where: {
          date: {
            gte: startDate,
            lte: endDate,
          },
        },
        select: {
          amount: true,
        },
      },
    },
  });

  const reports: MonthlySleepReport[] = users.map((user) => {
    const amounts = user.records.map((r) => r.amount);

    if (!user.email) return null;

    if (amounts.length === 0) {
      // User has no records
      return {
        email: user.email,
        name: user.name || "User",
        totalSleep: "0",
        avgSleep: "0",
        bestSleep: 0,
        worstSleep: 0,
        daysTracked: 0,
        noData: true,
      };
    }

    const totalSleepNum = amounts.reduce((a, b) => a + b, 0);
    const bestSleep = Math.max(...amounts);
    const worstSleep = Math.min(...amounts);
    const avgSleepNum = totalSleepNum / amounts.length;

    return {
      email: user.email,
      name: user.name || "User", // default to "User" if undefined
      totalSleep: totalSleepNum.toFixed(1),
      avgSleep: avgSleepNum.toFixed(1),
      bestSleep,
      worstSleep,
      daysTracked: amounts.length,
      noData: false,
    };
  }).filter((report): report is MonthlySleepReport => report !== null);

  return reports;
}
