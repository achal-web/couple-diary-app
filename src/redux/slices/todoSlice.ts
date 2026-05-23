import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  priority: 'high' | 'medium' | 'low';
  category?: string;
}

interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  filter: 'all' | 'completed' | 'incomplete';
  sortBy: 'date' | 'priority' | 'title';
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
  filter: 'all',
  sortBy: 'date',
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
      state.error = null;
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.unshift(action.payload);
      state.error = null;
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.todos.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
      state.error = null;
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(t => t.id !== action.payload);
      state.error = null;
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find(t => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        todo.updatedAt = new Date().toISOString();
      }
    },
    setFilter: (state, action: PayloadAction<'all' | 'completed' | 'incomplete'>) => {
      state.filter = action.payload;
    },
    setSortBy: (state, action: PayloadAction<'date' | 'priority' | 'title'>) => {
      state.sortBy = action.payload;
    },
  },
});

export const {
  setLoading,
  setError,
  setTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
  setFilter,
  setSortBy,
} = todoSlice.actions;

export default todoSlice.reducer;
