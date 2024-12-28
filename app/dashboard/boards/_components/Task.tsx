import { cn } from "@/lib/utils";
import { Column, Task as TaskType } from "@/types";
import { useState } from "react";

import TaskOptions from "./TaskOptions";

export default function Task({
  task,
  column,
}: {
  task: TaskType;
  column: Column;
}) {
  const [isTaskOptionsOpen, setIsTaskOptionsOpen] = useState(false);

  return (
    <div className="group flex h-[88px] w-full cursor-pointer flex-col items-start gap-[8px] rounded-md bg-background px-[16px] py-[23px] hover:bg-bgHover">
      <div className="flex w-full">
        <div className="flex w-11/12 flex-col gap-[8px]">
          <p className="text-heading-m font-medium text-foreground">
            {task.title}
          </p>

          <p className="text-body-m text-mediumGray">
            {`${task.subtasks.filter((s) => s.completed).length} of ${
              task.subtasks.length
            } subtasks`}
          </p>
        </div>

        <span
          className={cn(
            "-translate-y-[4px] opacity-0 transition-opacity duration-200",
            {
              "opacity-70": isTaskOptionsOpen,
              "group-hover:opacity-70": !isTaskOptionsOpen,
            },
          )}
        >
          <TaskOptions
            task={task}
            column={column}
            setIsTaskOptionsOpen={setIsTaskOptionsOpen}
          />
        </span>
      </div>
    </div>
  );
}
