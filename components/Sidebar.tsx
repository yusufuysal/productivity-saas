import Image from "next/image";

export default function Sidebar() {
  return (
    <div className="border-borderColor fixed bottom-0 left-0 top-0 hidden min-h-screen border-r-[1px] bg-background md:flex md:w-[261px] md:flex-col md:justify-between lg:w-[300px]">
      <div className="flex flex-col">
        <div className="mt-[32px] flex gap-4 md:ml-[26px] lg:ml-[34px]">
          <span>Logo</span>
          <p>Company Name</p>
        </div>

        <div className="mt-[54px] flex flex-col">
          <h4 className="text-heading-s text-mediumGray h-[34px] font-bold md:pl-[24px] lg:pl-[32px]">
            ALL BOARDS (8)
          </h4>
          <button className="text-heading-m flex h-[48px] w-[240px] items-center gap-4 rounded-r-full bg-primary font-[500] text-primary-foreground md:gap-[13px] md:pl-[24px] lg:w-[276px] lg:gap-[17px] lg:pl-[32px]">
            <Image
              src="/images/board-icon.svg"
              alt="Board Icon"
              width="16"
              height="16"
            />
            Platform Launch
          </button>
          <button className="text-heading-m text-mediumGray flex h-[48px] w-[240px] items-center gap-4 font-[500] md:gap-[13px] md:pl-[24px] lg:w-[276px] lg:gap-[17px] lg:pl-[32px]">
            <Image
              src="/images/board-icon-grey.svg"
              alt="Board Icon"
              width="16"
              height="16"
              className="text-mediumGray"
            />
            Platform Launch
          </button>
          <button className="text-heading-m text-mediumGray flex h-[48px] w-[240px] items-center gap-4 rounded-r-full font-[500] md:gap-[13px] md:pl-[24px] lg:w-[276px] lg:gap-[17px] lg:pl-[32px]">
            <Image
              src="/images/board-icon-grey.svg"
              alt="Board Icon"
              width="16"
              height="16"
            />
            Platform Launch
          </button>
          <button className="text-heading-m text-mediumGray flex h-[48px] w-[240px] items-center gap-4 rounded-r-full font-[500] text-primary md:gap-[13px] md:pl-[24px] lg:w-[276px] lg:gap-[17px] lg:pl-[32px]">
            <Image
              src="/images/board-icon-purple.svg"
              alt="Board Icon"
              width="16"
              height="16"
            />
            + Create New Board
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-[16px]">
        <div className="bg-dashboardMainContentColor flex h-[48px] items-center justify-center gap-[24px] rounded-md md:ml-[13px] md:w-[235px] lg:ml-[24px] lg:w-[251px]">
          <Image src="/images/sun.svg" alt="Sun Icon" width="18" height="18" />
          <Image
            src="/images/theme-switch.svg"
            alt="Moon Icon"
            width="40"
            height="20"
          />
          <Image
            src="/images/moon.svg"
            alt="Moon Icon"
            width="15"
            height="15"
          />
        </div>

        <div className="mb-[32px] flex h-[48px] items-center justify-start gap-[10px] md:pl-[24px] lg:pl-[32px]">
          <Image
            src="/images/hide-sidebar-icon.svg"
            alt="Hide Sidebar Icon"
            width="18"
            height="16"
          />
          <p className="text-heading-m text-mediumGray font-[500]">
            Hide Sidebar
          </p>
        </div>
      </div>
    </div>
  );
}
