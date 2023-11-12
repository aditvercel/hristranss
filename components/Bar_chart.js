"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const data = {
  responsive: true,
  maintainAspectRatio: false, // Set to false to make the chart fill its container
  aspectRatio: undefined, // Set to undefined to remove the aspect ratio restriction
  labels: ["Label 1", "Label 2", "Label 3", "Label 4", "Label 5"],
  datasets: [
    {
      label: "Dataset 1",
      data: [12, 19, 3, 5, 2],
      backgroundColor: "#1b4298",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
      borderRadius: 15,
    },
  ],
};

const options = {
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: true,
      },
    },
  },
};

export default function Bar_chart() {
  return <Bar data={data} options={options} />;
}
