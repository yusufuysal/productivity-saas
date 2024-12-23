export type Subtask = {
  title: string;
};

export type Task = {
  title: string;
  position: number;
  subtasks: Subtask[] | [];
};

export type Column = {
  id: string;
  title: string;
  tasks: Task[] | [];
  position: number;
};

export type Board = {
  id: string;
  created_at: string;
  user_id: string;
  title: string;
  slug: string;
  columns: Column[];
};
