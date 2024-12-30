"use client";

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
  }, [data]);

  const onDragEnd = async (result: any) => {
    const { destination, source, type } = result;

    if (!destination) return;

    // If the item is dropped in the same place, do nothing
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (type === "column") {
      const reorderedColumns = reorder(
        columns,
        source.index,
        destination.index,
      );
      setColumns(reorderedColumns);

      const data = await reorderColumnsAction(
        activeBoard?.id,
        reorderedColumns,
      );

      if (data.success && data.updatedColumns) {
        toast.success("Column reordered successfully");
      } else {
        console.error(data.error);
      }
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="columns" type="column" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-[24px]"
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
