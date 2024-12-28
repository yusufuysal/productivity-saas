"use client";

import { useColumnStore } from "@/store/columnStore";
import { useGetColumns } from "@/utils/hooks/useColumns";
import { useEffect } from "react";

import Column from "./Column";

export default function Columns() {
  const { data, isLoading, isError, error } = useGetColumns();
  const { columns, setColumns } = useColumnStore();

  useEffect(() => {
    if (data) {
      setColumns(data);
    }
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  return (
    <>
      {columns.map((column) => (
        <Column key={column.id} column={column} />
      ))}
    </>
  );
}
