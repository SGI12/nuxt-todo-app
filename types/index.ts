export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

export interface Note {
  id: string;
  title: string;
  todos: TodoItem[];
  createdAt: number;
  updatedAt: number;
}

export interface HistoryState {
  title: string;
  todos: TodoItem[];
}
