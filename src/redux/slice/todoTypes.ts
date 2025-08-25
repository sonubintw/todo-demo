export interface TodosState {
  todos: Todo[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
  sortBy: 'id' | 'recent';
  filterBy: 'all' | 'active' | 'done';
}

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  userId: number;
  created_at: string;
  updated_at: string;
}
