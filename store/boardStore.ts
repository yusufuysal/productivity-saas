import { create } from "zustand";

interface BoardStore {
  boards: Board[];
  activeBoard: Board | null;
  setBoards: (boards: Board[]) => void;
  addBoard: (newBoard: Board) => void;
  deleteBoard: (id: string) => void;
  setActiveBoard: (board: Board) => void;
}

export const useBoardStore = create<BoardStore>((set) => ({
  boards: [],

  activeBoard: null,

  setBoards: (boards) => set({ boards }),
  addBoard: (newBoard) =>
    set((state) => ({ boards: [...state.boards, newBoard] })),
  deleteBoard: (id) =>
    set((state) => ({
      boards: state.boards.filter((board) => board.id !== id),
    })),

  setActiveBoard: (board) => set({ activeBoard: board }),
}));
