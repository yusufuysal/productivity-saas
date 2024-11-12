"use client";

import {
  BoardIcon,
  HideSidebarIcon,
  MoonIcon,
  SunIcon,
  ThemeSwitchIcon,
} from "./svgs";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

export default function Sidebar() {
  const pathname = usePathname();
  const isActive = (path: string) => path === pathname;

  return (
    <div className="sidebar-wrapper">
      <div className="flex flex-col">
        <div className="mt-[32px] flex gap-4 md:ml-[26px] lg:ml-[34px]">
          <span>Logo</span>
          <p>Company Name</p>
        </div>

        <div className="mt-[54px] flex flex-col">
          <h4 className="h-[34px] text-heading-s font-bold text-mediumGray md:pl-[24px] lg:pl-[32px]">
            ALL BOARDS (8)
          </h4>
          <Link
            href="/dashboard/boards"
            className={`sidebar-link ${
              isActive("/dashboard/boards")
                ? "sidebar-link-active"
                : "sidebar-link-inactive"
            }`}
          >
            <BoardIcon alt="Board Icon" width="16" height="16" />
            Boards
          </Link>

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
          <Button className="sidebar-button h-[48px] w-[240px] justify-start gap-4 rounded-r-full text-heading-m font-[500] text-primary md:gap-[13px] md:pl-[24px] lg:w-[276px] lg:gap-[17px] lg:pl-[32px]">
            <BoardIcon alt="Board Icon" width="16" height="16" />+ Create New
            Board
          </Button>
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
          <ThemeSwitchIcon alt="Moon Icon" width="40" height="20" />
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
    </div>
  );
}
