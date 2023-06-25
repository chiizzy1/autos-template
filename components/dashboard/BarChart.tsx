"use client";

import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const data = {
  labels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Sales $",
      data: [18127, 22201, 19490, 17938, 24182, 17842, 22475],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgb(53, 162, 235, 0.4",
    },
  ],
};

export const options = {
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Daily Revenue",
    },
  },
  maintainAspectRatio: false,
  responsive: true,
};

const BarChart = () => {
  return (
    <div className="w-full md:col-span-2 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
