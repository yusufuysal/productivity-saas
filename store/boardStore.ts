import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface BoardStore {
  boards: Board[];
  activeBoard: Board | null;
  setBoards: (boards: Board[]) => void;
  addBoard: (newBoard: Board) => void;
  deleteBoard: (id: string) => void;
  setActiveBoard: (board: Board) => void;
}

interface BaordsExpand {
  isBoardsExpanded: boolean;
  setIsBoardsExpanded: () => void;
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

export const useBoardsExpand = create<BaordsExpand>()(
  persist(
    (set) => ({
      isBoardsExpanded: false,
      setIsBoardsExpanded: () =>
        set((state) => ({ isBoardsExpanded: !state.isBoardsExpanded })),
    }),
    {
      name: "is-boards-expanded",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
