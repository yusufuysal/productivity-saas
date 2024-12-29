"use client";

import { HorizontalDotsIcon } from "@/components/svgs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Column, Task } from "@/types";

import DeleteTask from "./DeleteTask";
import ViewTask from "./ViewTask";

export default function TaskOptions({
  task,
  column,
  setIsTaskOptionsOpen,
}: {
  task: Task;
  column: Column;
  setIsTaskOptionsOpen: (isTaskOptionsOpen: boolean) => void;
}) {
  return (
    <DropdownMenu
      onOpenChange={(isTaskOptionsOpen) =>
        setIsTaskOptionsOpen(isTaskOptionsOpen)
      }
    >
      <DropdownMenuTrigger className="rounded-md px-[5px] py-[5px] text-foreground opacity-70 hover:bg-mediumGray hover:bg-opacity-20">
        <HorizontalDotsIcon alt="Options" width={16} height={16} />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="flex w-[170px] flex-col items-start justify-center gap-[14px] rounded-md border-[1px] border-indigo-400 border-opacity-20 bg-background px-0 py-[12px]">
        <DropdownMenuItem
          className="mx-[8px] h-[20px] w-[160px] sm:space-x-0"
          onSelect={(e) => e.preventDefault()}
        >
          <DeleteTask task={task} column={column} />
        </DropdownMenuItem>

        <DropdownMenuItem
          className="mx-[8px] h-[20px] w-[160px] sm:space-x-0"
          onSelect={(e) => e.preventDefault()}
        >
          <ViewTask task={task} columnId={column.id} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
