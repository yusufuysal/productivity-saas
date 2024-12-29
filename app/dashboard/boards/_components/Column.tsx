"use client";

import { Column as ColumnType } from "@/types";
import { Draggable, Droppable } from "@hello-pangea/dnd";

import ColumnOptions from "./ColumnOptions";
import { CreateNewTask } from "./CreateNewTask";
import Task from "./Task";

export default function Column({ column }: { column: ColumnType }) {
  return (
    <Draggable draggableId={column.id} index={column.position - 1}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="relative flex max-h-[72vh] min-w-[280px] flex-col gap-[12px] rounded-md border-[1px] border-indigo-400 border-opacity-20 p-[8px] pb-0 dark:border-borderColor"
        >
          <div
            {...provided.dragHandleProps}
            className="sticky top-0 flex h-[20px] items-center justify-between text-left text-heading-s uppercase text-mediumGray"
          >
            <p>{`${column.title} (${column.tasks?.length})`}</p>
            <ColumnOptions column={column} />
          </div>
          <Droppable droppableId={column.id} type="card">
            {(provided) => (
              <ol
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="flex flex-col gap-[20px] overflow-y-auto "
              >
                {column.tasks?.map((task) => (
                  <Task key={task.id} task={task} column={column} />
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
