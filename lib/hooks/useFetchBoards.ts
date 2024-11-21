import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export const useFetchBoards = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const supabase = createClient();

  async function getUserBoards() {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (!user) {
      console.error("No authenticated user found:", authError);
      return [];
    }

    const { data, error } = await supabase
      .from("boards")
      .select("*")
      .eq("user_id", `${user.id}`);

    if (error) {
      console.error("Error fetching boards:", error);
      return [];
    }

    return data;
  }

  useEffect(() => {
    getUserBoards().then((boards) => setBoards(boards));
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel("realtime boards")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "boards",
        },
        (payload) => {
          setBoards([...boards, payload.new as Board]);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, boards, setBoards]);

  return boards;
};
