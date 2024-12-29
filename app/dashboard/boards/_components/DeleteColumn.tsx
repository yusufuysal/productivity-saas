"use client";

import ConfirmationDialog from "@/components/ConfirmationDialog";
import { useBoardStore } from "@/store/boardStore";
import { useColumnStore } from "@/store/columnStore";
import { Column } from "@/types";
import { deleteColumnAction } from "@/utils/actions/columns";
import { useState } from "react";
import { toast } from "sonner";

export default function DeleteColumn({ column }: { column: Column }) {
  const [isDeletingColumn, setIsDeletingColumn] = useState(false);
  const { setColumns } = useColumnStore();
  const { activeBoard } = useBoardStore();

  const handleDeleteColumn = async (columnId: string) => {
    const res = await deleteColumnAction(activeBoard?.id, columnId);

    if (res.success && res.updatedColumns) {
      toast.success("Column deleted successfully!");

      setColumns(res.updatedColumns);
    } else {
      console.error("Error deleting column:", res.error);
    }
  };

  return (
    <ConfirmationDialog
      isOpen={isDeletingColumn}
      setIsOpen={setIsDeletingColumn}
      dialogTriggerContent={"Delete Column"}
      dialogTitle={"Delete this column?"}
      dialogDescription={`Are you sure you want to delete the ‘${column.title}’ column? This action will remove all tasks and subtasks and cannot be reversed.`}
      confirmText={"Delete"}
      confirmAction={() => handleDeleteColumn(column.id)}
      className="w-full rounded-md px-[8px] py-[6px] text-start hover:bg-mediumGray hover:bg-opacity-10"
    />
  );
}
