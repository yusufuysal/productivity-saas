"use client";

import ConfirmationDialog from "@/components/ConfirmationDialog";
import { useBoardStore } from "@/store/boardStore";
import { useColumnStore } from "@/store/columnStore";
import { Column, Task } from "@/types";
import { updateColumnAction } from "@/utils/actions/columns";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function DeleteTask({
  task,
  column,
}: {
  task: Task;
  column: Column;
}) {
  const [isDeletingTask, setIsDeletingTask] = useState(false);
  const { columns, setColumns } = useColumnStore();
  const { activeBoard } = useBoardStore();

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
      toast.success("Task deleted successfully!");

      setColumns(res.updatedColumns);
    } else {
      console.error("Error deleting task:", res.error);
    }
  };
  return (
    <ConfirmationDialog
      isOpen={isDeletingTask}
      setIsOpen={setIsDeletingTask}
      dialogTriggerContent={
        <div className="flex items-center gap-2">
          <Trash2 size={18} />
          Delete Task
        </div>
      }
      dialogTitle={"Delete this task?"}
      dialogDescription={`Are you sure you want to delete the ‘${task.title}’ task? This action will remove the selected task and all the subtasks it contains and cannot be reversed.`}
      confirmText={"Delete"}
      confirmAction={() => handleDeleteTask(column.id, task.id)}
      className="w-full rounded-md px-[8px] py-[6px] text-start text-destructive hover:bg-red-100 dark:hover:bg-red-950"
    />
  );
}
