"use client";

import FormDialog from "@/components/FormDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useBoardStore } from "@/store/boardStore";
import { useColumnStore } from "@/store/columnStore";
import { Task } from "@/types";
import { updateColumnAction } from "@/utils/actions/columns";
import { cn } from "@/utils/cn";
import { useState } from "react";
import { toast } from "sonner";

export default function ViewTask({
  task,
  columnId,
}: {
  task: Task;
  columnId: string;
}) {
  const { columns, setColumns } = useColumnStore();
  const { activeBoard } = useBoardStore();

  const [isViewingTask, setIsViewingTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleSaveSubtasks = async (updatedTask: Task, columnId: string) => {
    const selectedColumn = columns.find((column) => column.id === columnId);

    if (!selectedColumn) {
      return;
    }

    const updatedColumn = {
      ...selectedColumn,
      tasks: selectedColumn.tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task,
      ),
    };

    const res = await updateColumnAction(activeBoard?.id, updatedColumn);

    if (res.success && res.updatedColumns) {
      toast.success("Subtasks updated successfully!");
      setColumns(res.updatedColumns);
      setIsViewingTask(false); // Close dialog after saving
    } else {
      toast.error(res.error || "Failed to update subtasks.");
    }
  };

  const toggleSubtaskCompletion = (subtaskId: string) => {
    setSelectedTask((prev) => {
      if (!prev) return null;

      const updatedSubtasks = prev.subtasks.map((subtask) =>
        subtask.id === subtaskId
          ? { ...subtask, completed: !subtask.completed }
          : subtask,
      );

      return { ...prev, subtasks: updatedSubtasks };
    });
  };

  const editSubtasksForm = (
    <form className=" flex flex-col gap-[24px]">
      <div className="flex flex-col gap-[16px]">
        <Label
          className="text-heading-m text-mediumGray dark:text-white"
          htmlFor="subtasks"
        >
          Subtasks
        </Label>

        <div className=" flex flex-col gap-[8px]">
          {selectedTask?.subtasks.map((subtask) => (
            <div
              key={subtask.id}
              className=" md:h-[40px] md:p-[12px] md:gap-[16px] flex items-center rounded bg-dashboardMainContentColor"
            >
              <Input
                id="subtasks"
                type="checkbox"
                checked={subtask.completed}
                onChange={() => toggleSubtaskCompletion(subtask.id)}
                className={cn(
                  "h-[16px] w-[16px] rounded-[2px] border-[1px] border-[#828FA3] border-opacity-25",
                  subtask.completed ? "bg-primary" : "bg-background",
                )}
              />
              <p
                className={`text-body-m font-bold h${
                  subtask.completed ? " opacity-50 line-through" : ""
                }`}
              >
                {subtask.title}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Button
        className="h-[40px] w-full rounded-[20px]"
        variant={"primary"}
        onClick={(e) => {
          e.preventDefault();
          selectedTask && handleSaveSubtasks(selectedTask, columnId);
        }}
      >
        Save Changes
      </Button>
    </form>
  );

  return (
    <FormDialog
      isOpen={isViewingTask}
      setIsOpen={setIsViewingTask}
      onOpen={() => setSelectedTask(task)} // Set selectedTask when the dialog opens
      dialogTriggerContent={"View Task"}
      dialogTitle={task.title}
      form={editSubtasksForm}
      className="w-full rounded-md px-[8px] py-[6px] text-start hover:bg-mediumGray hover:bg-opacity-10"
    />
  );
}
