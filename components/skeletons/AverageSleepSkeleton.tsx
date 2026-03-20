
import { Skeleton } from "@/components/ui/skeleton";

const AverageSleepSkeleton = () => {
  return (
    <div className="bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full text-center space-y-4">
        <Skeleton className="h-6 w-2/3 mx-auto" />
        <Skeleton className="h-10 w-3/4 mx-auto bg-linear-to-r from-gray-200 to-gray-300" />
      </div>
    </div>
  );
};

export default AverageSleepSkeleton;
