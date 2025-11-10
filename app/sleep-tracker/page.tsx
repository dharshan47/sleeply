import React from "react";
import AddNewRecord from "../../components/AddNewRecord";
import RecordChart from "@/components/RecordChart";
import AverageSleep from "@/components/AverageSleep";
import RecordHistory from "@/components/RecordHistory";
import BestWorstSleep from "@/components/BestWorstSleep";
import UserInfo from "@/components/UserInfo";

const SleepTracker = () => {
  return (
    <div className="min-h-screen w-full font-sans mt-16 text-gray-800 bg-gray-100 ">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          <UserInfo />
          <AddNewRecord />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <RecordChart />
          <AverageSleep />
          <BestWorstSleep />
        </div>
      </div>

      {/* Full width bottom section */}
      <div className=" max-w-7xl mx-auto  ">
        <RecordHistory />
      </div>
    </div>
  );
};

export default SleepTracker;
