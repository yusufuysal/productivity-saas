import { usePathname } from "next/navigation";

import { Skeleton } from "./ui/skeleton";

const SidebarSkeleton = () => {
  //  const pathname = usePathname();
  //  const isActive = (path: string) => path === pathname;

  return (
    <aside className="hidden h-full md:flex md:min-w-[261px] md:flex-col md:justify-between lg:min-w-[300px]">
      <div className="flex flex-col">
        <div className="mt-[32px] flex gap-4 md:ml-[26px] lg:ml-[34px]">
          <Skeleton className="h-[35px] w-[35px] rounded-full" />
          <Skeleton className="h-[35px] w-[100px]" />
        </div>

        <div className="mt-[54px] flex flex-col">
          <div className="sidebar-link">
            <div className="flex h-[48px] w-[240px] items-center gap-4">
              <Skeleton className="w-[16px] h-[16px] rounded" />
              <Skeleton className="w-[54px] h-[21px]" />
            </div>
            <Skeleton className="h-[28px] w-[28px]" />
          </div>

          <div className="sidebar-link">
            <Skeleton className="w-[16px] h-[16px] rounded" />
            <Skeleton className="w-[86px] h-[21px]" />
          </div>

          <div className="sidebar-link">
            <Skeleton className="w-[16px] h-[16px] rounded" />
            <Skeleton className="w-[104px] h-[21px]" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[16px]">
        <div className="flex h-[48px] items-center justify-center gap-[24px] rounded-md  md:ml-[13px] md:w-[235px] lg:ml-[24px] lg:w-[251px] border-[1px] border-muted">
          <Skeleton className="w-[19px] h-[19px]" />
          <Skeleton className="w-[44px] h-[24px]" />
          <Skeleton className="w-[16px] h-[16px]" />
        </div>

        <div className="sidebar-button mb-[32px] h-[48px] justify-start gap-[10px] transition-none md:pl-[24px] md:hover:w-[248px] lg:pl-[32px] lg:hover:w-[275px]">
          <Skeleton className=" w-[18px] h-[16px]" />
          <Skeleton className="w-[92px] h-[19px]" />
        </div>
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
