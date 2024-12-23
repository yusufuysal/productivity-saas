"use client";
import { useEffect, useState } from "react";
import { useColumnStore } from "@/store/columnStore";
import { useGetColumns } from "@/utils/hooks/useColumns";
import { CreateNewColumn } from "../_components/CreateNewColumn";
import { CreateNewTask } from "../_components/CreateNewTask";
import { deleteColumnAction } from "@/utils/actions/columns";
import { useBoardStore } from "@/store/boardStore";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import { Button } from "@/components/ui/button";
import { HorizontalDotsIcon } from "@/components/svgs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Dashboard() {
  const { data, isLoading, isError, error } = useGetColumns();
  const { columns, setColumns } = useColumnStore();
  const { activeBoard } = useBoardStore();
  const [isDeletingColumn, setIsDeletingColumn] = useState(false);

  useEffect(() => {
    if (data) {
      setColumns(data);
    }
  }, [data]);

  const handleDeleteColumn = async (columnId: string) => {
    console.log("deleting...");
    const res = await deleteColumnAction(activeBoard?.id, columnId);

    if (res.success && res.updatedColumns) {
      // Update local state with server response
      setColumns(res.updatedColumns);
    } else {
      console.error("Error deleting column:", res.error);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="flex h-full gap-[24px] p-[24px]">
      {columns.map((column) => (
        <div
          key={column.position}
          className="relative flex max-h-[72vh] min-w-[280px] flex-col gap-[12px] rounded-md border-[1px] border-indigo-400 border-opacity-20 p-[8px] pb-0 dark:border-borderColor"
        >
          <div className="sticky top-0 flex h-[20px] items-center justify-between text-left text-heading-s uppercase text-mediumGray">
            <p>{`${column.title} (${column.tasks?.length})`}</p>
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-md px-[5px] py-[5px] text-foreground opacity-70 hover:bg-mediumGray hover:bg-opacity-20">
                <HorizontalDotsIcon alt="Options" width={16} height={16} />
              </DropdownMenuTrigger>

              <DropdownMenuContent className="flex w-[170px] -translate-x-[72px] -translate-y-[4px] flex-col items-start justify-center gap-[14px] rounded-md border-[1px] border-indigo-400 border-opacity-20 bg-background px-0 py-[12px]">
                <DropdownMenuItem
                  className="mx-[8px] h-[20px] w-[160px] sm:space-x-0"
                  onSelect={(e) => e.preventDefault()}
                >
                  <ConfirmationDialog
                    isOpen={isDeletingColumn}
                    setIsOpen={setIsDeletingColumn}
                    dialogTriggerContent={"Delete Column"}
                    dialogTitle={"Delete this column?"}
                    dialogDescription={`Are you sure you want to delete the ‘${column.title}’ column? This action will remove all tasks and subtasks and cannot be reversed.`}
                    confirmText={"Delete"}
                    confirmAction={() => handleDeleteColumn(column.id)}
                    className="w-full rounded-md px-[8px] py-[6px] text-start hover:bg-mediumGray hover:bg-opacity-10"
                  />
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="mx-[8px] h-[20px] w-[160px] sm:space-x-0"
                  onSelect={(e) => e.preventDefault()}
                >
                  <p className="w-full rounded-md px-[8px] py-[6px] text-start hover:bg-mediumGray hover:bg-opacity-10">
                    Edit Column
                  </p>
                </DropdownMenuItem>

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
          </div>
          <div className="flex flex-col gap-[20px] overflow-y-auto">
            {column.tasks?.map((task) => (
              <div className="flex h-[88px] w-full cursor-pointer flex-col items-start gap-[8px] rounded-md bg-background px-[16px] py-[23px] hover:bg-bgHover">
                <p className="text-heading-m font-medium text-foreground">
                  {task.title}
                </p>
                <p className="text-body-m text-mediumGray">0 of 3 substasks</p>
              </div>
            ))}
          </div>

          <CreateNewTask position={column.position} />
        </div>
      ))}
      <CreateNewColumn />
    </div>
  );
}
