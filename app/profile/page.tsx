import dynamic from "next/dynamic";
import { ProfileSkeleton } from "@/components/skeletons";

const Profile = dynamic(() => import("@/components/profile").then(mod => mod.Profile), {
  loading: () => <ProfileSkeleton />,
});

export default function ProfilePage() {
  return <Profile />;
}
