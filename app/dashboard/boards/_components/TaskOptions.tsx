"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Column, Task } from "@/types";
import { MoreHorizontal } from "lucide-react";

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
      <DropdownMenuTrigger className="rounded-md px-[2px] text-foreground opacity-70 hover:bg-mediumGray hover:bg-opacity-20">
        <MoreHorizontal />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="flex w-[170px] flex-col border-[1px] border-borderColor bg-background p-[8px] z-[9999] rounded-lg"
      >
        <DropdownMenuItem
          className="min-h-[20px] w-full sm:space-x-0 py-0"
          onSelect={(e) => e.preventDefault()}
        >
          <ViewTask task={task} columnId={column.id} />
        </DropdownMenuItem>

        <DropdownMenuItem
          className="min-h-[20px] w-full sm:space-x-0 py-0"
          onSelect={(e) => e.preventDefault()}
        >
          <DeleteTask task={task} column={column} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
