interface Board {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
}

type NewBoard = Omit<Board, "id" | "created_at">;
