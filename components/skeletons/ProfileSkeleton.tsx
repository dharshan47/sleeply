import { Skeleton } from "@/components/ui/skeleton";

const ProfileSkeleton = () => {
  return (
    <main className="min-h-screen bg-background w-full font-sans mt-16 text-gray-800">
      <div className="container max-w-4xl mx-auto py-10 px-4 space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-48 rounded-md" />
          <Skeleton className="h-10 w-24 rounded-md" />
        </div>

        {/* Profile Picture Card */}
        <div className="bg-white shadow-lg rounded-lg p-8 w-full border border-gray-100">
          <div className="flex flex-col items-center space-y-4">
             <Skeleton className="h-32 w-32 rounded-full" />
             <Skeleton className="h-4 w-48" />
          </div>
        </div>

        {/* Account Info Card */}
        <div className="bg-white shadow-lg rounded-lg p-8 w-full border border-gray-100 space-y-6">
           <Skeleton className="h-7 w-48 mb-4 " />
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
           </div>
           <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-24 w-full rounded-md" />
           </div>
        </div>

        {/* Social Links Card */}
        <div className="bg-white shadow-lg rounded-lg p-8 w-full border border-gray-100 space-y-6">
           <Skeleton className="h-7 w-32 mb-4" />
           <div className="grid md:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full rounded-md" />
                </div>
              ))}
           </div>
        </div>

        <Skeleton className="h-12 w-full rounded-md" />
      </div>
    </main>
  );
};

export default ProfileSkeleton;
