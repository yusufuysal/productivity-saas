import { User } from "@supabase/supabase-js";
import { create } from "zustand";

interface AuthStore {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  currentUser: null,

  setCurrentUser: (user: User | null) => {
    set({
      currentUser: user,
    });
  },
}));
