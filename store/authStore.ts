import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { create } from "zustand";

interface AuthStore {
  currentUser: User | null;
  setCurrentUser: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  currentUser: null,

  setCurrentUser: async () => {
    const supabase = createClient(); // Create Supabase client
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error("Error fetching user:", error);
      set({ currentUser: null });
      return;
    }

    // Update the store with the user or null if not logged in
    set({
      currentUser: user,
    });
  },
}));
