"use client";

import { Column as ColumnType } from "@/types";

import ColumnOptions from "./ColumnOptions";
import { CreateNewTask } from "./CreateNewTask";
import Task from "./Task";

export default function Column({ column }: { column: ColumnType }) {
  return (
    <div className="relative flex max-h-[72vh] min-w-[280px] flex-col gap-[12px] rounded-md border-[1px] border-indigo-400 border-opacity-20 p-[8px] pb-0 dark:border-borderColor">
      <div className="sticky top-0 flex h-[20px] items-center justify-between text-left text-heading-s uppercase text-mediumGray">
        <p>{`${column.title} (${column.tasks?.length})`}</p>
        <ColumnOptions column={column} />
      </div>
      <div className="flex flex-col gap-[20px] overflow-y-auto">
        {column.tasks?.map((task) => (
          <Task key={task.id} task={task} column={column} />
        ))}
      </div>

      <CreateNewTask position={column.position} />
    </div>
  );
}
