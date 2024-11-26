import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export const useFetchBoards = (currentUser: User | null) => {
  const [boards, setBoards] = useState<Board[] | []>([]);

  //console.log("boards????????", boards);
  const supabase = createClient();

  async function getUserBoards(currentUser: User | null) {
    if (currentUser === null) {
      return [];
    }

    const { data, error } = await supabase
      .from("boards")
      .select("*")
      .eq("user_id", `${currentUser?.id}`);

    if (error) {
      console.error("Error fetching boards:", error);
      return [];
    }

    return data;
  }

  useEffect(() => {
    getUserBoards(currentUser).then((boards) => setBoards(boards));
  }, [currentUser]);

  return boards;
};
