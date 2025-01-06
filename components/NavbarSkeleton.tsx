import { Skeleton } from "./ui/skeleton";

const NavbarSkeleton = () => (
  <div className="flex h-[64px] items-center justify-end gap-8 p-3 px-5 md:h-[81px]">
    <div className="flex items-center gap-2">
      <Skeleton className=" w-[16px] h-[16px]" />
    </div>

    <div>
      <Skeleton className=" w-[28px] h-[28px]" />
    </div>
  </div>
);

export default NavbarSkeleton;
