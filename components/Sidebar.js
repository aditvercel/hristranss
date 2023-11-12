import React from "react";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BadgeIcon from "@mui/icons-material/Badge";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";

const bstyle = {
  active: "flex align-middle items-center self-center text-sm text-blue-500",
  notactive: "flex align-middle items-center self-center text-sm text-gray-500",
};

const sidebar = [
  {
    text: "Dashboard",
    link: "/",
    icon: <SpaceDashboardIcon />,
    status: true,
  },
  { text: "Finance", link: "/", icon: <AttachMoneyIcon />, status: false },
  { text: "Employees", link: "/Employee", icon: <BadgeIcon />, status: true },
  { text: "Company", link: "/", icon: <LocationCityIcon />, status: false },
  { text: "Candidate", link: "/", icon: <AccountBoxIcon />, status: false },
  { text: "Calender", link: "/", icon: <CalendarMonthIcon />, status: false },
];

const user_sidebar = [
  { text: "Profile", link: "/", icon: <PersonIcon />, status: false },
  { text: "Setting", link: "/", icon: <SettingsIcon />, status: false },
];

export default function Sidebar() {
  return (
    <div className="w-[15%]  p-5 grid shadow-lg shadow-black">
      <div className="grid gap-2 border-b border-black border-dashed">
        <div className="flex gap-2 ">
          <div className="flex align-middle items-center">
            <Avatar
              sx={{ bgcolor: "black" }}
              alt="Remy Sharp"
              src="/broken-image.jpg"
            />
          </div>
          <div className="grid align-middle items-center">
            <div>
              <div className=" text-lg">Adityamms</div>
              <div className=" text-xs">HR manager</div>
            </div>
          </div>
        </div>
        <div className="mb-5 grid gap-5">
          {sidebar.map((item) => {
            return (
              <>
                <Link
                  href={item.link}
                  className="flex gap-2 items-center align-middle hover:border-l-2 border-blue-500"
                >
                  <div
                    className={item.status ? bstyle.active : bstyle.notactive}
                  >
                    {item.icon}
                  </div>
                  <div
                    className={item.status ? bstyle.active : bstyle.notactive}
                  >
                    {item.text}
                  </div>
                </Link>
              </>
            );
          })}
        </div>
      </div>
      <div className="mt-5">
        <div className="grid gap-5">
          {user_sidebar.map((item) => {
            return (
              <>
                <Link
                  className="flex gap-2 hover:border-l-2 border-blue-500"
                  href={item.link}
                >
                  <div
                    className={item.status ? bstyle.active : bstyle.notactive}
                  >
                    {item.icon}
                  </div>
                  <div
                    className={item.status ? bstyle.active : bstyle.notactive}
                  >
                    {item.text}
                  </div>
                </Link>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
