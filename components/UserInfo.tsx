"use client";

import { useSession } from "@/lib/auth-client";
import { PrivacySettings } from "@/types/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";

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

  if (!mounted) return null;
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col sm:flex-row items-center sm:items-start gap-6">
      {user?.image ? (
        <Image
          src={user.image}
          alt={`${user.name}'s profile`}
          className=" rounded-full border border-gray-300 shadow-md"
          width={96}
          height={96}
        />
      ) : (
        <div className="w-24 h-24 rounded-full flex items-center justify-center text-xl text-gray-800 border-2">
          {user?.name?.[0]?.toUpperCase() || "U"}
        </div>
      )}

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
