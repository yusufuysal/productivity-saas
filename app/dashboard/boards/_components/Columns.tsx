"use client";

import { useColumnStore } from "@/store/columnStore";
import { useGetColumns } from "@/utils/hooks/useColumns";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useEffect } from "react";

import Column from "./Column";

export default function Columns() {
  const { data, isLoading, isError, error } = useGetColumns();
  const { columns = [], setColumns } = useColumnStore();

  useEffect(() => {
    if (data) {
      setColumns(data);
    }
  }, [data]);

  //const handleOnDragEnd = (result: {
  //  source: { index: number };
  //  destination?: { index: number } | null;
  //}) => {
  //  if (!result.destination) return;

  //  const newColumns = Array.from(columns);

  //  const [draggedColumn] = newColumns.splice(result.source.index, 1);

  //  newColumns.splice(result.destination.index, 0, draggedColumn);

  //  setColumns(newColumns);
  //};

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  return (
    <DragDropContext onDragEnd={() => {}}>
      <Droppable
        droppableId="columns-container"
        type="list"
        direction="horizontal"
      >
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-[24px]"
          >
            {columns.map((column) => (
              <Column key={column.id} column={column} />
            ))}
            {provided.placeholder}
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
}
