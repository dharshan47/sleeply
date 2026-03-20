export const dynamic = "force-dynamic";

import {
  AverageSleep,
  BestWorstSleep,
  RecordChart,
  RecordHistory,
} from "@/components/records";
import nextDynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const AddNewRecord = nextDynamic(() => import("@/components/records/AddNewRecord"), {
  loading: () => <Skeleton className="h-[400px] w-full rounded-lg" />,
});

import {
  BestWorstSleepSkeleton,
  RecordChartSkeleton,
  RecordHistorySkeleton,
  AverageSleepSkeleton,
} from "@/components/skeletons";
import { UserInfo } from "@/components/user";
import { Suspense } from "react";
import { getRecordCount } from "../actions/getRecordCount";

const suspenseSections = [
  { id: "record-chart", component: RecordChart, fallback: RecordChartSkeleton },
  {
    id: "average-sleep",
    component: AverageSleep,
    fallback: AverageSleepSkeleton,
  },
  {
    id: "best-worst-sleep",
    component: BestWorstSleep,
    fallback: BestWorstSleepSkeleton,
  },
];

const SleepTracker = async () => {
  const count = await getRecordCount();
  return (
    <main className="min-h-screen w-full font-sans mt-16 text-gray-800 bg-gray-100">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          <UserInfo />
          <AddNewRecord />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {suspenseSections.map(
            ({ id, component: Component, fallback: Fallback }) => (
              <Suspense key={id} fallback={<Fallback />}>
                <Component />
              </Suspense>
            ),
          )}
        </div>
      </div>

      {/* Full width bottom section */}
      <div className="max-w-7xl mx-auto">
        <Suspense fallback={<RecordHistorySkeleton count={count} />}>
          <RecordHistory />
        </Suspense>
      </div>
    </main>
  );
};

export default SleepTracker;
