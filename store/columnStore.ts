import { create } from "zustand";
import { Column } from "@/types";

type ColumnStore = {
  columns: Column[] | [];
  setColumns: (newColumns: Column[]) => void;
};

export const useColumnStore = create<ColumnStore>((set) => ({
  columns: [],

  setColumns: (newColumns: Column[]) => set({ columns: newColumns }),
}));
