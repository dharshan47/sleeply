import dynamic from "next/dynamic";
import { SettingsSkeleton } from "@/components/skeletons";

const Settings = dynamic(() => import("@/components/settings").then(mod => mod.Settings), {
  loading: () => <SettingsSkeleton />,
});

export default function SettingsPage() {
  return <Settings />;
}
