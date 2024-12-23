"use client";
import { useEffect, useState } from "react";
import { useColumnStore } from "@/store/columnStore";
import { useGetColumns } from "@/utils/hooks/useColumns";
import { CreateNewColumn } from "../_components/CreateNewColumn";
import { CreateNewTask } from "../_components/CreateNewTask";
import {
  deleteColumnAction,
  updateColumnAction,
} from "@/utils/actions/columns";
import { useBoardStore } from "@/store/boardStore";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import { HorizontalDotsIcon } from "@/components/svgs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/utils/cn";
import { toast } from "sonner";

export default function Dashboard() {
  const { data, isLoading, isError, error } = useGetColumns();
  const { columns, setColumns } = useColumnStore();
  const { activeBoard } = useBoardStore();
  const [isDeletingColumn, setIsDeletingColumn] = useState(false);
  const [isTaskOptionsOpen, setIsTaskOptionsOpen] = useState(false);
  const [isDeletingTask, setIsDeletingTask] = useState(false);

  useEffect(() => {
    if (data) {
      setColumns(data);
    }
  }, [data]);

  const handleDeleteColumn = async (columnId: string) => {
    const res = await deleteColumnAction(activeBoard?.id, columnId);

    if (res.success && res.updatedColumns) {
      // Update local state with server response

      toast.success("Column deleted successfully!");

      setColumns(res.updatedColumns);
    } else {
      console.error("Error deleting column:", res.error);
    }
  };

  const handleDeleteTask = async (columnId: string, taskId: string) => {
    const selectedColumn = columns.find((column) => column.id === columnId);

    if (!selectedColumn) {
      return;
    }

    const updatedColumn = {
      ...selectedColumn,
      tasks: selectedColumn.tasks.filter((task) => task.id !== taskId),
    };

    const res = await updateColumnAction(activeBoard?.id, updatedColumn);

    if (res.success && res.updatedColumns) {
      // Update local state with server response
      toast.success("Task deleted successfully!");

      setColumns(res.updatedColumns);
    } else {
      console.error("Error deleting task:", res.error);
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
              <div className="group flex h-[88px] w-full cursor-pointer flex-col items-start gap-[8px] rounded-md bg-background px-[16px] py-[23px] hover:bg-bgHover">
                <div className="flex w-full">
                  <div className="flex w-11/12 flex-col gap-[8px]">
                    <p className="text-heading-m font-medium text-foreground">
                      {task.title}
                    </p>

                    <p className="text-body-m text-mediumGray">
                      0 of 3 subtasks
                    </p>
                  </div>

                  <span
                    className={cn(
                      "-translate-y-[4px] opacity-0 transition-opacity duration-200",
                      {
                        "opacity-70": isTaskOptionsOpen, // Ensure the icon stays visible when the dropdown is open
                        "group-hover:opacity-70": !isTaskOptionsOpen, // Show the icon only on hover if dropdown is not open
                      },
                    )}
                  >
                    <DropdownMenu
                      onOpenChange={(isTaskOptionsOpen) =>
                        setIsTaskOptionsOpen(isTaskOptionsOpen)
                      }
                    >
                      <DropdownMenuTrigger className="rounded-md px-[5px] py-[5px] text-foreground opacity-70 hover:bg-mediumGray hover:bg-opacity-20">
                        <HorizontalDotsIcon
                          alt="Options"
                          width={16}
                          height={16}
                        />
                      </DropdownMenuTrigger>

                      <DropdownMenuContent className="flex w-[170px] flex-col items-start justify-center gap-[14px] rounded-md border-[1px] border-indigo-400 border-opacity-20 bg-background px-0 py-[12px]">
                        <DropdownMenuItem
                          className="mx-[8px] h-[20px] w-[160px] sm:space-x-0"
                          onSelect={(e) => e.preventDefault()}
                        >
                          <ConfirmationDialog
                            isOpen={isDeletingTask}
                            setIsOpen={setIsDeletingTask}
                            dialogTriggerContent={"Delete Task"}
                            dialogTitle={"Delete this task?"}
                            dialogDescription={`Are you sure you want to delete the ‘${task.title}’ task? This action will remove the selected task and all the subtasks it contains and cannot be reversed.`}
                            confirmText={"Delete"}
                            confirmAction={() =>
                              handleDeleteTask(column.id, task.id)
                            }
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
                  </span>
                </div>
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
