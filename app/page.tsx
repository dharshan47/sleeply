"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Img from "@/public/sleep-tracker.png";
import { useSession } from "@/lib/auth-client";

export default function Home() {
  const router = useRouter();

  const { data: session } = useSession();

  const getStarted = () => {
    if (!session) {
      router.push("/login");
    } else {
      router.push("/sleep-tracker");
    }
  };

  return (
    <div className="min-h-screen font-sans w-full mt-16  text-gray-800 ">
      <div className="grid grid-cols-1 md:grid-cols-2 bg-gray-100 jusity-center items-center p-3 md:p-10 pt-10 ">
        <div className="md:pl-10 mb-8 ">
          <span className="text-2xl md:text-4xl font-bold  bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Welcome to Sleeply
          </span>
          <p className="md:text-xl mb-6 mt-2">
            Track your sleep, improve your health, and wake up feeling refreshed
            with Sleeply.
          </p>
          <Button
            className="w-auto bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white px-4 py-2 rounded-md font-medium cursor-pointer"
            onClick={getStarted}
          >
            Get Started
          </Button>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <Image
            src={Img}
            alt="SleepTracker Illustration"
            className="w-full md:max-w-md rounded-tl-3xl rounded-br-3xl shadow-lg"
          />
        </div>
      </div>
      <div className="py-16 px-8 bg-white">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 ">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-8">
          <div>
            <h3 className="text-xl font-bold">What is Sleeply?</h3>
            <p className="text-gray-600">
              Sleeply is a powerful tool designed to help you monitor your sleep
              patterns and improve your overall health.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold">How does it work?</h3>
            <p className="text-gray-600">
              Sleeply analyzes your sleep data and provides personalized
              insights to help you achieve better sleep.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold">Is Sleeply free?</h3>
            <p className="text-gray-600">
              Yes, Sleeply offers a free plan with basic features. Premium plans
              are available for advanced insights and analytics.
            </p>
          </div>
        </div>
      </div>
      <div className="py-16 px-8 bg-gray-100">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          What Our Users Say
        </h2>
        <div
          className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8
        "
        >
          <div className="bg-white p-6 rounded-md shadow">
            <p className="text-gray-700 mb-4">
              &quot;Sleeply has completely transformed my sleep schedule. I feel
              more energized every day!&quot;
            </p>
            <p className="text-purple-500 font-bold">- Sarah L.</p>
          </div>

          <div className="bg-white p-6 rounded-md shadow">
            <p className="text-gray-700 mb-4">
              &quot;The insights from Sleeply have helped me identify and fix my
              sleep issues. Highly recommend it!&quot;
            </p>
            <p className="text-purple-500 font-bold">- John D.</p>
          </div>
          <div className="bg-white p-6 rounded-md shadow">
            <p className="text-gray-700 mb-4">
              &quot;Sleeply is so easy to use and provides accurate data.
              It&#39;s a must-have for anyone looking to improve their
              sleep!&quot;
            </p>
            <p className="text-purple-500 font-bold">- Emily R.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
