import { create } from "zustand";

type BoardStore = {
  title: string | null;
  setTitle: (newTitle: string) => void;
};

export const useBoardStore = create<BoardStore>((set) => ({
  title: null,

  setTitle: (newTitle: string) => {
    set({ title: newTitle });
  },
}));
