import {
  BoardIcon,
  HideSidebarIcon,
  MoonIcon,
  SunIcon,
  ThemeSwitchIcon,
} from "./svgs";

export default function Sidebar() {
  return (
    <div className="fixed bottom-0 left-0 top-0 hidden min-h-screen border-r-[1px] border-borderColor bg-background md:flex md:w-[261px] md:flex-col md:justify-between lg:w-[300px]">
      <div className="flex flex-col">
        <div className="mt-[32px] flex gap-4 md:ml-[26px] lg:ml-[34px]">
          <span>Logo</span>
          <p>Company Name</p>
        </div>

        <div className="mt-[54px] flex flex-col">
          <h4 className="h-[34px] text-heading-s font-bold text-mediumGray md:pl-[24px] lg:pl-[32px]">
            ALL BOARDS (8)
          </h4>
          <button className="flex h-[48px] w-[240px] items-center gap-4 rounded-r-full bg-primary text-heading-m font-[500] text-primary-foreground md:gap-[13px] md:pl-[24px] lg:w-[276px] lg:gap-[17px] lg:pl-[32px]">
            <BoardIcon
              alt="Board Icon"
              width="16"
              height="16"
              className="hover:text-red text-white"
            />
            Platform Launch
          </button>
          <button className="flex h-[48px] w-[240px] items-center gap-4 text-heading-m font-[500] text-mediumGray hover:rounded-r-full hover:bg-secondary hover:text-primary md:gap-[13px] md:pl-[24px] lg:w-[276px] lg:gap-[17px] lg:pl-[32px]">
            <BoardIcon alt="Board Icon" width="16" height="16" />
            Platform Launch
          </button>
          <button className="flex h-[48px] w-[240px] items-center gap-4 text-heading-m font-[500] text-mediumGray hover:rounded-r-full hover:bg-secondary hover:text-primary md:gap-[13px] md:pl-[24px] lg:w-[276px] lg:gap-[17px] lg:pl-[32px]">
            <BoardIcon alt="Board Icon" width="16" height="16" />
            Platform Launch
          </button>
          <button className="flex h-[48px] w-[240px] items-center gap-4 rounded-r-full text-heading-m font-[500] text-mediumGray text-primary hover:rounded-r-full hover:bg-secondary hover:text-primary md:gap-[13px] md:pl-[24px] lg:w-[276px] lg:gap-[17px] lg:pl-[32px]">
            <BoardIcon alt="Board Icon" width="16" height="16" />+ Create New
            Board
          </button>
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

        <button className="mb-[32px] flex h-[48px] items-center justify-start gap-[10px] text-mediumGray hover:rounded-r-full hover:bg-secondary hover:text-primary md:pl-[24px] md:hover:w-[248px] lg:pl-[32px] lg:hover:w-[275px]">
          <HideSidebarIcon alt="Hide Sidebar Icon" width="18" height="16" />
          <p className="text-heading-m font-[500]">Hide Sidebar</p>
        </button>
      </div>
    </div>
  );
}
