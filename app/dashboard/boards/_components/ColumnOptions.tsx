import { HorizontalDotsIcon } from "@/components/svgs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Column } from "@/types";

import DeleteColumn from "./DeleteColumn";

export default function ColumnOptions({ column }: { column: Column }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-md px-[5px] py-[5px] text-foreground opacity-70 hover:bg-mediumGray hover:bg-opacity-20">
        <HorizontalDotsIcon alt="Options" width={16} height={16} />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="flex w-[170px] -translate-x-[72px] -translate-y-[4px] flex-col items-start justify-center gap-[14px] rounded-md border-[1px] border-indigo-400 border-opacity-20 bg-background px-0 py-[12px]">
        {/* DELETE COLUMN */}
        <DropdownMenuItem
          className="mx-[8px] h-[20px] w-[160px] sm:space-x-0"
          onSelect={(e) => e.preventDefault()}
        >
          <DeleteColumn column={column} />
        </DropdownMenuItem>

        {/* EDIT COLUMN */}
        <DropdownMenuItem
          className="mx-[8px] h-[20px] w-[160px] sm:space-x-0"
          onSelect={(e) => e.preventDefault()}
        >
          <p className="w-full rounded-md px-[8px] py-[6px] text-start hover:bg-mediumGray hover:bg-opacity-10">
            Edit Column
          </p>
        </DropdownMenuItem>

        {/* DELETE ALL TASKS */}
        <DropdownMenuItem
          className="mx-[8px] h-[20px] w-[160px] sm:space-x-0"
          onSelect={(e) => e.preventDefault()}
        >
          <p className="w-full rounded-md px-[8px] py-[6px] text-start hover:bg-mediumGray hover:bg-opacity-10">
            Delete All Tasks
          </p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
