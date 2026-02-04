import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  count: number; // number of skeleton items
}
const RecordHistorySkeleton = ({ count }: Props) => {
  return (
    <div className="bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 mx-auto space-y-6">
        {/* Title */}
        <Skeleton className="h-7 w-1/3" />

        {/* List items */}
        <ul className="space-y-4">
          {Array.from({ length: count }).map((_, i) => (
            <li
              key={i}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-6 w-16 rounded-md" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecordHistorySkeleton;
