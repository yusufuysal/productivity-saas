export type Subtask = {
  id: string;
  title: string;
  completed: boolean;
};

export type Task = {
  id: string;
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
