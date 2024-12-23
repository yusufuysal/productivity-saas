import { create } from "zustand";
import { Board } from "@/types";

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
