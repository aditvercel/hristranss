import React from "react";
import Bar_chart from "./Bar_chart";
import { Area_chart } from "./Area_chart";
import { Pie_chart } from "./Pie_chart";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

const card = [
  {
    text: "Total Employees",
    data_number: 3000,
    mini_text: "Employee",
    trending: false,
  },
  { text: "Job view", data_number: 1200, mini_text: "Viewer", trending: true },
  {
    text: "Job applied",
    data_number: 1500,
    mini_text: "Applicant",
    trending: true,
  },
  {
    text: "Resign Employees",
    data_number: 12,
    mini_text: "Employee",
    trending: false,
  },
];

export default function Dashboard() {
  return (
    <div className="w-full p-5">
      <div className="font-bold text-2xl border h-20 items-center flex p-5 shadow-md rounded-lg mb-5 ">
        Dashboard
      </div>
      {/* card */}
      <div className="w-full flex justify-evenly gap-5 align-middle items-center">
        {card.map((item) => {
          return (
            <>
              <div className="h-32 w-60 border-2 rounded-lg p-4 overflow-hidden shadow-lg mt-5 mb-5">
                <div className="grid gap-2">
                  <div className="flex gap-2">
                    <div className="font-medium text-md">{item.text}</div>
                    {item.trending ? (
                      <TrendingUpIcon sx={{ color: "green" }} />
                    ) : (
                      <TrendingDownIcon sx={{ color: "red" }} />
                    )}
                  </div>
                  <div className="font-medium text-3xl">{item.data_number}</div>
                  <div className=" text-xs">{item.mini_text}</div>
                </div>
              </div>
            </>
          );
        })}
      </div>
      {/* card */}

      {/* Jobstatistic */}
      <div className=" h-[300px] border mt-5 shadow-md flex gap-5 p-2 mb-5">
        <div className="border h-full w-1/2 shadow-lg shadow-black">
          <Bar_chart />
        </div>
        <div className="border h-full w-1/2 items-center flex align-middle justify-center">
          <Pie_chart />
        </div>
      </div>
      {/* Jobstatistic */}

      {/* Jobstatistic */}
      <div className=" h-[300px] mt-10 shadow-md w-[100%] overflow-hidden">
        <div className="h-full w-full">
          <Area_chart />
        </div>
      </div>
      {/* Jobstatistic */}
    </div>
  );
}
