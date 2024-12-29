"use client";

import BoardsDropdown from "@/app/dashboard/boards/_components/BoardsDropdown";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
  ArrowDownIcon,
  BoardIcon,
  HideSidebarIcon,
  MoonIcon,
  SunIcon,
} from "./svgs";
import { Button } from "./ui/button";

const Sidebar = () => {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const isActive = (path: string) => path === pathname;

  const [isBoardsExpanded, setIsBoardsExpanded] = useState(false);

  const toggleBoardsExpanded = () => {
    setIsBoardsExpanded((prev) => !prev);
  };

  return (
    <aside className="sidebar-wrapper">
      <div className="flex flex-col">
        <div className="mt-[32px] flex gap-4 md:ml-[26px] lg:ml-[34px]">
          <span>Logo</span>
          <p>Company Name</p>
        </div>

        <div className="mt-[54px] flex flex-col">
          {/*<h4 className="h-[34px] text-heading-s font-bold text-mediumGray md:pl-[24px] lg:pl-[32px]">
            ALL BOARDS (8)
          </h4>*/}

          <Button
            onClick={toggleBoardsExpanded}
            className={`sidebar-button h-[48px] w-[240px] justify-between gap-4 rounded-r-full text-heading-m font-[500] md:gap-[13px] md:pl-[24px] lg:w-[276px] lg:gap-[17px] lg:pl-[32px] ${
              isActive("/dashboard/boards")
                ? "sidebar-link-active"
                : "sidebar-link-inactive"
            }`}
          >
            <div className="flex items-center gap-4">
              <BoardIcon alt="Board Icon" width="16" height="16" />
              Boards
            </div>
            <ArrowDownIcon
              width="28"
              height="28"
              className={`transition-transform duration-300 ${
                isBoardsExpanded ? "rotate-180" : "rotate-0"
              }`}
            />
          </Button>
          {
            <BoardsDropdown
              isBoardsExpanded={isBoardsExpanded}
              setIsBoardsExpanded={setIsBoardsExpanded}
            />
          }
          <Link
            href="/dashboard/pomodoro"
            className={`sidebar-link ${
              isActive("/dashboard/pomodoro")
                ? "sidebar-link-active"
                : "sidebar-link-inactive"
            }`}
          >
            <BoardIcon alt="Board Icon" width="16" height="16" />
            Pomodoro
          </Link>

          <Link
            href="/dashboard/habit-tracker"
            className={`sidebar-link ${
              isActive("/dashboard/habit-tracker")
                ? "sidebar-link-active"
                : "sidebar-link-inactive"
            }`}
          >
            <BoardIcon alt="Board Icon" width="16" height="16" />
            Habit Tracker
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-[16px]">
        <div className="flex h-[48px] items-center justify-center gap-[24px] rounded-md bg-dashboardMainContentColor md:ml-[13px] md:w-[235px] lg:ml-[24px] lg:w-[251px]">
          <SunIcon
            alt="Sun Icon"
            width="19"
            height="19"
            className="text-mediumGray"
          />
          <Switch
            checked={theme === "dark"}
            onCheckedChange={() =>
              setTheme(theme === "light" ? "dark" : "light")
            }
          />
          <MoonIcon
            alt="Moon Icon"
            width="16"
            height="16"
            className="text-mediumGray"
          />
        </div>

        <Button className="sidebar-button mb-[32px] h-[48px] justify-start gap-[10px] transition-none md:pl-[24px] md:hover:w-[248px] lg:pl-[32px] lg:hover:w-[275px]">
          <HideSidebarIcon alt="Hide Sidebar Icon" width="18" height="16" />
          <p className="text-heading-m font-[500]">Hide Sidebar</p>
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
