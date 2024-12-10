import { create } from "zustand";

type Task = {
  title: string;
  subtasks: Task[];
};

type Column = {
  title: string;
  tasks: Task[];
  position: number;
};

type Board = {
  id: string;
  created_at: string;
  user_id: string;
  title: string;
  slug: string;
  columns: Column[];
};

type BoardStore = {
  boards: Board[] | [];
  activeBoard: Board | null;
  setBoards: (newBoards: Board[]) => void;
  setActiveBoard: (board: Board | null) => void;
};

export const useBoardStore = create<BoardStore>((set) => ({
  boards: [],
  activeBoard: null,

  setBoards: (newBoards: Board[]) => set({ boards: newBoards }),
  setActiveBoard: (board: Board | null) => set({ activeBoard: board }),
}));
