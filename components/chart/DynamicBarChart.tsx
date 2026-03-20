"use client";

import dynamic from "next/dynamic";
import { RecordChartSkeleton } from "../skeletons";

const BarChart = dynamic(() => import("./BarChart"), {
  loading: () => <RecordChartSkeleton />,
  ssr: false,
});

export default BarChart;
