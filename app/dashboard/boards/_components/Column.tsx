"use client";

import { Column as ColumnType } from "@/types";
import { Draggable, Droppable } from "@hello-pangea/dnd";

import ColumnOptions from "./ColumnOptions";
import { CreateNewTask } from "./CreateNewTask";
import Task from "./Task";

export default function Column({
  column,
  index,
}: {
  column: ColumnType;
  index: number;
}) {
  const reorderedTasks = column.tasks?.sort(
    (a, b) => (a.position || 0) - (b.position || 0),
  );

  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="relative flex min-w-[280px] flex-col gap-[24px] rounded-md border-[1px] border-indigo-400 border-opacity-20 p-[8px] pb-0 dark:border-borderColor"
        >
          <div
            {...provided.dragHandleProps}
            className="sticky top-0 flex h-[20px] items-center justify-between text-left text-heading-s uppercase text-mediumGray"
          >
            <p>{`${column.title} (${column.tasks?.length})`}</p>
            <ColumnOptions column={column} />
          </div>
          <Droppable droppableId={column.id} type="task" direction="vertical">
            {(provided) => (
              <ol
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="flex-1 flex flex-col gap-[20px] overflow-y-auto pb-[112px]"
              >
                {reorderedTasks?.map((task, index) => (
                  <Task
                    key={task.id}
                    task={task}
                    column={column}
                    index={index}
                  />
                ))}

                {provided.placeholder}
              </ol>
            )}
          </Droppable>
          <CreateNewTask position={column.position} />
        </li>
      )}
    </Draggable>
  );
}
