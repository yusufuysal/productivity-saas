interface Board {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
}

interface NewBoard {
  user_id: string;
  title: string;
}
