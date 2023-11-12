import Image from "next/image";
import React from "react";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="h-20 shadow-sm shadow-black text-white align-middle items-center flex p-5 gap-5 justify-between">
      <Link href={"/"}>
        <img
          src={
            "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/TransMedia.svg/1200px-TransMedia.svg.png"
          }
          className="w-40 h-5"
        />
      </Link>
      <div>
        <Tooltip title="Signout">
          <button className=" text-black font-medium shadow-md w-32 h-10 shadow-black hover:shadow-blue-900 rounded-md">
            <PowerSettingsNewIcon />
          </button>
        </Tooltip>
      </div>
    </div>
  );
}
