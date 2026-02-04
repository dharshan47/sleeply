import { Skeleton } from "@/components/ui/skeleton";

const RecordChartSkeleton = () => {
  return (
    <div className="bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full">

        {/* Title – same as RecordChart */}
        <h3 className="text-2xl font-bold text-center mb-6">
          <Skeleton className="h-7 w-64 mx-auto rounded-md" />
        </h3>

        {/* BarChart placeholder – EXACT size, no extra layout */}
        <Skeleton className="h-75 w-full rounded-md" />

      </div>
    </div>
  );
};

export default RecordChartSkeleton;
