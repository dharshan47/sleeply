
import { Skeleton } from "@/components/ui/skeleton";

const BestWorstSleepSkeleton = () => {
  return (
    <div className="bg-gray-100 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full">
        {/* Title */}
        <Skeleton className="h-8 w-48 mx-auto mb-6 rounded-md" />

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-6 sm:space-y-0">
          {/* Best Sleep */}
          <div className="text-center">
            <h4 className="text-lg font-medium text-gray-600 mb-2 invisible">Best Sleep</h4>
            <Skeleton className="h-6 w-24 mx-auto mb-2" />
            <Skeleton className="h-9 w-32 mx-auto bg-linear-to-r from-gray-200 to-gray-300" />
          </div>

          {/* Worst Sleep */}
          <div className="text-center">
             <h4 className="text-lg font-medium text-gray-600 mb-2 invisible">Worst Sleep</h4>
            <Skeleton className="h-6 w-24 mx-auto mb-2" />
            <Skeleton className="h-9 w-32 mx-auto bg-linear-to-r from-gray-200 to-gray-300" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestWorstSleepSkeleton;
