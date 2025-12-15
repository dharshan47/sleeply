import prisma from "../lib/prisma";

export interface MonthlySleepReport {
  email: string;
  name?: string;
  totalSleep: string;
  avgSleep: string;
  bestSleep: number;
  worstSleep: number;
  daysTracked: number;
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

  const reports: (MonthlySleepReport | null)[] = users.map((user) => {
    if (!user.email || user.records.length === 0) {
      return null;
    }

    const amounts = user.records.map((r) => r.amount);

    const totalSleepNum = amounts.reduce((a, b) => a + b, 0);
    const bestSleep = Math.max(...amounts);
    const worstSleep = Math.min(...amounts);
    const avgSleepNum = totalSleepNum / amounts.length;

    return {
      email: user.email,
      name: user.name ?? undefined,
      totalSleep: totalSleepNum.toFixed(1),
      avgSleep: avgSleepNum.toFixed(1),
      bestSleep,
      worstSleep,
      daysTracked: amounts.length,
    };
  });

  return reports.filter(
    (report): report is MonthlySleepReport => report !== null
  );
}
