import { Skeleton } from "./ui/skeleton";

const BoardsDropdownSkeleton = () => (
  <div className="h-64">
    <div className="my-2 flex flex-col gap-2">
      <div className="sidebar-link h-[40px] pl-14">
        <Skeleton className="h-[24px] w-[64px]" />
      </div>
      <div className="sidebar-link h-[40px] pl-14">
        <Skeleton className="h-[24px] w-[104px]" />
      </div>
      <div className="sidebar-link h-[40px] pl-14">
        <Skeleton className="h-[24px] w-[84px]" />
      </div>
      <div className="sidebar-link h-[40px] pl-14">
        <Skeleton className="h-[24px] w-[94px]" />
      </div>

      <div className="sidebar-button h-[48px] w-[240px] justify-start gap-4 rounded-r-full px-0 py-0 pl-10 md:gap-[13px] lg:w-[276px] lg:gap-[17px]">
        <Skeleton className=" w-[16px] h-[16px]" />
        <Skeleton className=" w-[158px] h-[21px]" />
      </div>
    </div>
  </div>
);

export default BoardsDropdownSkeleton;
