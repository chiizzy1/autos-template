"use client";

import { FC } from "react";
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

interface BarChartProps {
  chartData: any;
}

const BarChart: FC<BarChartProps> = ({ chartData }) => {
  let cost: any = [];
  let days: any = [];

  chartData.forEach((item: any) => {
    cost.push(item.estimatedCost);
    days.push(new Date(item.startDate).toDateString());
  });

  const data = {
    labels: days,
    datasets: [
      {
        label: "Sales $",
        data: cost,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgb(53, 162, 235, 0.4",
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Revenue",
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div className="w-full md:col-span-2 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
