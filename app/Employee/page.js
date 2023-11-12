import React from "react";
import Diagram from "@/components/Diagram";
import Sidebar from "@/components/Sidebar";

export default function page() {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="grid p-5 gap-5 w-full">
          <div className="font-bold text-2xl border h-20 items-center flex p-5 shadow-md rounded-lg ">
            Employee's Diagram
          </div>
          <div className="flex justify-center align-middle h-screen relative mb-[50px]">
            <Diagram />
          </div>
        </div>
      </div>
    </>
  );
}
