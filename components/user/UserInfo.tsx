"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/lib/auth-client";
import { PrivacySettings } from "@/types/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { useEffect, useState } from "react";

const UserInfo = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const [privacy, setPrivacy] = useState<PrivacySettings>({
    showMemberSince: true,
    showLastActive: true,
  });
  const [mounted, setMounted] = useState(false);
  const [memberSince, setMemberSince] = useState("");
  const [lastActive, setLastActive] = useState("");

  useEffect(() => {
    if (!user) return;
    setMounted(true);

    // Load privacy settings from localStorage
    const key = `privacySettings_${user.email || user.id}`;
    const saved = localStorage.getItem(key);
    if (saved) setPrivacy(JSON.parse(saved));

    if (user?.createdAt) {
      setMemberSince(new Date(user.createdAt).toLocaleDateString());
    }
    setLastActive(new Date().toLocaleString());
  }, [user]);

  if (!mounted || !user) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col sm:flex-row gap-6">
        {/* Avatar */}
        <Skeleton className="h-24 w-24 rounded-full" />

        <div className="flex-1 space-y-4">
          {/* Title */}
          <Skeleton className="h-7 w-2/3" />

          {/* Description */}
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />

          {/* Meta info */}
          <Skeleton className="h-5 w-40 rounded-full" />
          <Skeleton className="h-5 w-35 rounded-full" />
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col sm:flex-row items-center sm:items-start gap-6">
      <Avatar className="h-24 w-24 border border-gray-300 shadow-md rounded-full">
  <AvatarImage
    src={user.image || ""}
    alt={user.name || "User"}
    width={96}
    height={96}
  />
  <AvatarFallback className="text-xl font-bold text-gray-800">
    {user.name?.[0]?.toUpperCase() || "U"}
  </AvatarFallback>
</Avatar>

      <div className="flex-1">
        <h2 className="text-2xl md:text-3xl font-bold text-purple-600 mb-2">
          Welcome Back, {user?.name} 👋
        </h2>
        <p className="text-gray-600 mb-4">
          Here&#39;s a quick overview of your recent sleep activity. Stay on top
          of your data insights and manage your tasks efficiently!
        </p>
        <div className="space-y-2">
          {privacy.showMemberSince && <p>Member Since: {memberSince}</p>}
          {privacy.showLastActive && <p>Last Active: {lastActive}</p>}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
