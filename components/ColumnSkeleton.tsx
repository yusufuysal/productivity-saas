import TaskSkeleton from "./TaskSkeleton";
import { Skeleton } from "./ui/skeleton";

const ColumnSkeleton = ({ children }: { children: JSX.Element }) => (
  <div className="flex h-full min-w-[280px] flex-col gap-[24px] rounded-md  p-[8px] pb-0 border-[1px] border-indigo-400 border-opacity-20 dark:border-borderColor">
    <div className="flex h-[20px] items-center justify-between">
      <Skeleton className=" w-[96px] h-[15px] bg-background opacity-80" />
      <Skeleton className=" w-[24px] h-[16px] bg-background opacity-80" />
    </div>

    <div className="flex-1 flex flex-col gap-[20px] pb-[112px]">{children}</div>

    <div className="flex min-h-[48px] items-center justify-start gap-[12px] bg-dashboardMainContentColor pl-[24px] hover:bg-add-new-column-gradient-hover-light dark:hover:bg-add-new-column-gradient-hover-dark rounded-b-md mx-[-8px] mt-[-24px]">
      <div className="w-[21px] h-[21px] rounded bg-background opacity-80"></div>
      <div className="w-[64px] h-[21px] bg-background opacity-80 rounded-md"></div>
    </div>
  </div>
);

export default ColumnSkeleton;
