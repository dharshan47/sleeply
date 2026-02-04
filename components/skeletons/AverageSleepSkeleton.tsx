
import { Skeleton } from "@/components/ui/skeleton";

const AverageSleepSkeleton = () => {
  return (
    <div className="bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full text-center space-y-4">
        <Skeleton className="h-5 w-2/3 mx-auto" />
        <Skeleton className="h-10 w-1/2 mx-auto" />
      </div>
    </div>
  );
};

export default AverageSleepSkeleton;
