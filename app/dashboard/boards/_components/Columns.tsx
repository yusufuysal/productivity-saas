"use client";

import ColumnsSkeleton from "@/components/ColumnsSkeleton";
import { useBoardStore } from "@/store/boardStore";
import { useColumnStore } from "@/store/columnStore";
import { reorderColumnsAction } from "@/utils/actions/columns";
import { useGetColumns } from "@/utils/hooks/useColumns";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useEffect } from "react";
import { toast } from "sonner";

import Column from "./Column";

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);

  const [removed] = result.splice(startIndex, 1);

  result.splice(endIndex, 0, removed);

  return result;
}

export default function Columns() {
  const { data, isLoading, isError, error } = useGetColumns();
  const { columns = [], setColumns } = useColumnStore();
  const { activeBoard } = useBoardStore();

  useEffect(() => {
    if (data) {
      setColumns(data);
    }
  }, [data, setColumns]);

  const saveColumnsToDatabase = async (
    columns: any,
    type: "cols-reorder" | "tasks-reorder" | "task-moved-to-another-col",
  ) => {
    const data = await reorderColumnsAction(activeBoard?.id, columns);
    if (data.success && data.updatedColumns) {
      if (type === "cols-reorder") {
        toast.success("Column reordered successfully");
      } else if (type === "tasks-reorder") {
        toast.success("Tasks reordered successfully");
      } else if (type === "task-moved-to-another-col") {
        toast.success("Task status changed successfully");
      }
    } else {
      console.error(data.error);
    }
  };

  const handleDragEnd = (result: any) => {
    const { source, destination, type } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Reordering columns
    if (type === "column") {
      const reorderedCols = reorder(
        columns,
        source.index,
        destination.index,
      ).map((col, index) => ({ ...col, position: index }));

      setColumns(reorderedCols);

      // Optionally save column order to the database
      saveColumnsToDatabase(reorderedCols, "cols-reorder");
      return;
    }

    // Reordering or moving tasks
    if (type === "task") {
      const newColumns = [...columns];

      const sourceCol = newColumns.find((col) => col.id === source.droppableId);
      const destCol = newColumns.find(
        (col) => col.id === destination.droppableId,
      );

      if (!sourceCol || !destCol) {
        return;
      }

      if (!sourceCol.tasks) {
        sourceCol.tasks = [];
      }

      if (!destCol.tasks) {
        destCol.tasks = [];
      }

      //Moving the task in the same column
      if (source.droppableId === destination.droppableId) {
        const reorderedTasks = reorder(
          sourceCol.tasks,
          source.index,
          destination.index,
        );

        reorderedTasks.forEach((task, idx) => {
          task.position = idx;
        });

        sourceCol.tasks = reorderedTasks;

        setColumns(newColumns);
        saveColumnsToDatabase(newColumns, "tasks-reorder");
      }
      //Moving the card to another column
      else {
        const [movedTask] = sourceCol.tasks.splice(source.index, 1);

        destCol.tasks.splice(destination.index, 0, movedTask);

        sourceCol.tasks.forEach((task, idx) => {
          task.position = idx;
        });

        destCol.tasks.forEach((task, idx) => {
          task.position = idx;
        });

        setColumns(newColumns);
        saveColumnsToDatabase(newColumns, "task-moved-to-another-col");
      }
    }
  };

  if (isLoading) return <ColumnsSkeleton />;
  if (isError) return <p>Error: {error.message}</p>;
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="columns" type="column" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-[24px] h-full"
          >
            {columns.map((column, index) => (
              <Column key={column.id} column={column} index={index} />
            ))}
            {provided.placeholder}
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
}
