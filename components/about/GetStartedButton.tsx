"use client";


import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { useActionLock } from "@/hooks";

const GetStartedutton = () => {
  const { loading, lock, unlock } = useActionLock();
  const router = useRouter();

  const { data: session } = useSession();

  const getStarted = () => {
    if (!lock()) return; // Prevent double clicks

    try {
      if (!session) {
        router.push("/login");
      } else {
        router.push("/sleep-tracker");
      }
    } finally {
      unlock();
    }
  };
  return (
    <button
      className=" bg-white text-purple-600 hover:text-purple-700 px-6 py-3 rounded-md font-medium shadow-md transition cursor-pointer"
      onClick={getStarted}
      disabled={loading}
    >
      {loading ? "Loading..." : "Get Started"}
    </button>
  );
};

export default GetStartedutton;
