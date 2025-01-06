import { Skeleton } from "./ui/skeleton";

const TaskSkeleton = ({ width }: { width: number }) => (
  <div className="flex h-[88px] w-full flex-col items-start gap-[8px] rounded-md  px-[16px] py-[23px] bg-background">
    <div className="flex w-full">
      <div className="flex w-11/12 flex-col gap-[8px]">
        <Skeleton className={`w-[${width}px] h-[19px]`} />
        <Skeleton className=" w-[96px] h-[15px] " />
      </div>
    </div>
  </div>
);

export default TaskSkeleton;
