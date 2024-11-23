import { createClient } from "@/utils/supabase/client";
import { create } from "zustand";

interface AuthStore {
  currentUser: any;
  getCurrentUser: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  currentUser: undefined,

  getCurrentUser: async () => {
    const supabase = createClient(); // Create Supabase client
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error("Error fetching user:", error);
    }

    // Update the store with the user or null if not logged in
    set({
      currentUser: user,
    });
  },
}));
