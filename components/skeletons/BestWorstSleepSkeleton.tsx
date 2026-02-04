
import { Skeleton } from "@/components/ui/skeleton";

const BestWorstSleepSkeleton = () => {
  return (
    <div className="bg-gray-100 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full space-y-6">
        {/* Title */}
        <Skeleton className="h-7 w-1/2 mx-auto" />

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6">
          {/* Best Sleep */}
          <div className="flex-1 text-center space-y-3">
            <Skeleton className="h-5 w-24 mx-auto" />
            <Skeleton className="h-9 w-32 mx-auto" />
          </div>

          {/* Worst Sleep */}
          <div className="flex-1 text-center space-y-3">
            <Skeleton className="h-5 w-24 mx-auto" />
            <Skeleton className="h-9 w-32 mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestWorstSleepSkeleton;
