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

export default function Dashboard() {
  const { data, isLoading, isError, error } = useGetColumns();
  const { columns, setColumns } = useColumnStore();
  const { activeBoard } = useBoardStore();
  const [isDeleteColumnOpen, setIsDeleteColumnOpen] = useState(false);
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);

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
          <p className="sticky top-0 h-[20px] text-left text-heading-s uppercase text-mediumGray">
            {`${column.title} (${column.tasks?.length})`}
          </p>
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
          <ConfirmationDialog
            isOpen={isDeleteColumnOpen}
            setIsOpen={setIsDeleteColumnOpen}
            dialogTriggerContent={
              <Button variant={"destructive"} size={"sm"}>
                Delete column
              </Button>
            }
            dialogTitle="Delete Column"
            dialogDescription="Are you sure you want to delete this column?"
            confirmText="Delete"
            confirmAction={() => handleDeleteColumn(column.id)}
          />
        </div>
      ))}
      <CreateNewColumn />
    </div>
  );
}
