"use client";

import ConfirmationDialog from "@/components/ConfirmationDialog";
import FormDialog from "@/components/FormDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Column } from "@/types";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

import DeleteColumn from "./DeleteColumn";

export default function ColumnOptions({ column }: { column: Column }) {
  const [isDeletingAllTasks, setIsDeletingAllTasks] = useState(false);
  const [isEditingColumn, setIsEditingColumn] = useState(false);

  const dummyAsyncFn = async () => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    alert("hi");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-md px-[4px] py-[2px] text-foreground hover:bg-mediumGray hover:bg-opacity-20">
        <MoreHorizontal />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="center"
        className="flex w-[170px] -translate-x-[72px] -translate-y-[4px] flex-col items-start justify-center rounded-md border-[1px] border-borderColor bg-background p-[8px]"
      >
        <p className="text-xs text-foreground opacity-70 py-[6px] px-[8px] font-medium">
          Tasks
        </p>

        <DropdownMenuItem
          className="min-h-[20px] w-full sm:space-x-0 py-0 px-0"
          onSelect={(e) => e.preventDefault()}
        >
          <ConfirmationDialog
            isOpen={isDeletingAllTasks}
            setIsOpen={setIsDeletingAllTasks}
            dialogTriggerContent={
              <div className="flex items-center gap-2">
                <Trash2 size={18} />
                Delete All
              </div>
            }
            dialogTitle={"Delete all the tasks?"}
            dialogDescription={`Are you sure you want to delete all the tasks inside of '${column.title}' column?`}
            confirmText={"Delete"}
            confirmAction={dummyAsyncFn}
            className="w-full rounded-md px-[8px] py-[6px] text-start text-destructive hover:bg-red-100 dark:hover:bg-red-950"
          />
        </DropdownMenuItem>

        <div className="h-[1px] w-[186px] -mx-[8px] bg-borderColor my-[8px]"></div>

        <p className="text-xs text-foreground opacity-70 py-[6px] px-[8px] font-medium">
          Column
        </p>

        <DropdownMenuItem
          className="min-h-[20px] w-full sm:space-x-0 py-0 px-0"
          onSelect={(e) => e.preventDefault()}
        >
          <FormDialog
            isOpen={isEditingColumn}
            setIsOpen={setIsEditingColumn}
            dialogTriggerContent={
              <div className="flex items-center gap-2">
                <Pencil size={16} className="opacity-50" />
                Edit Details
              </div>
            }
            dialogTitle={"Edit Column Details"}
            form={<form></form>}
            className="w-full rounded-md px-[8px] py-[6px] text-start hover:bg-mediumGray hover:bg-opacity-10"
          />
        </DropdownMenuItem>

        <DropdownMenuItem
          className="min-h-[20px] w-full sm:space-x-0 py-0 px-0"
          onSelect={(e) => e.preventDefault()}
        >
          <DeleteColumn column={column} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
