import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  count: number; // number of skeleton items
}
const RecordHistorySkeleton = ({ count }: Props) => {
  return (
    <div 
      className="bg-gray-100 p-6"
      aria-busy="true"
      aria-live="polite"
      aria-label="Loading sleep history..."
    >
      <div className="bg-white shadow-lg rounded-lg p-8 mx-auto">
        {/* Title */}
        <Skeleton className="h-8 w-40 mb-4 rounded-md" />

        {/* List items */}
        <ul className="space-y-4">
          {Array.from({ length: count }).map((_, i) => (
            <li
              key={i}
              className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md mb-4 border-t border-t-gray-100 border-l-4 border-l-gray-200"
            >
              <div className="flex flex-col space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-40" />
              </div>
              <Skeleton className="w-8 h-8 rounded-full" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecordHistorySkeleton;
