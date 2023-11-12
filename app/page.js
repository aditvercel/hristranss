import Image from "next/image";
import Login_button from "../components/Login_button";
import Diagram from "../components/Diagram";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  return (
    <>
      <div className="flex w-full justify-between">
        <Sidebar />
        <Dashboard />
      </div>
    </>
  );
}
