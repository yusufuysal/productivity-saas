interface User {
  id: string;
  email: string;
  created_at: string;
}

interface Board {
  id: string;
  user_id: string;
  title: string;
  slug: string;
  created_at: string;
}

type NewBoard = Omit<Board, "id" | "created_at">;
