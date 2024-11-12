"use client";

import {
  ArrowDownIcon,
  BoardIcon,
  HideSidebarIcon,
  MoonIcon,
  SunIcon,
  ThemeSwitchIcon,
} from "./svgs";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import BoardLink from "./BoardLink";
import { Button } from "./ui/button";

export default function Sidebar() {
  const pathname = usePathname();
  const isActive = (path: string) => path === pathname;

  // State to control the expanded view of the Boards section
  const [isBoardsExpanded, setIsBoardsExpanded] = useState(false);
  const BOARDS = [
    { id: 1, boardName: "React portfolio project", href: "react" },
    { id: 2, boardName: "Linkedin content creation", href: "linkedin" },
    { id: 3, boardName: "Personal brand", href: "brand" },
    { id: 4, boardName: "Gym", href: "gym" },
    { id: 5, boardName: "Personal Growth", href: "growth" },
  ];

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

          <Button
            onClick={() => setIsBoardsExpanded(!isBoardsExpanded)}
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
          <div
            className={`overflow-hidden transition-[max-height] duration-700 ease-in-out ${
              isBoardsExpanded ? "max-h-80" : "max-h-0"
            }`}
          >
            <div className="my-2 flex flex-col gap-2">
              {BOARDS.map((board) => {
                const { id, boardName, href } = board;
                const isBoardActive = isActive(`/dashboard/boards/${href}`);

                return (
                  <BoardLink key={id} isActive={isBoardActive} href={href}>
                    {boardName}
                  </BoardLink>
                );
              })}

              <Button className="sidebar-button h-[48px] w-[240px] justify-start gap-4 rounded-r-full px-0 py-0 pl-10 text-heading-m font-[500] text-primary md:gap-[13px] lg:w-[276px] lg:gap-[17px]">
                <BoardIcon alt="Board Icon" width="16" height="16" />+ Create
                New Board
              </Button>
            </div>
          </div>

          {/* Other Links */}
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
