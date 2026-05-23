import AsyncStorage from '@react-native-async-storage/async-storage';

const TODO_STORAGE_KEY = 'couple_diary_todos';

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

/**
 * Get all todos from local storage
 */
export const getAllTodos = async (): Promise<Todo[]> => {
  try {
    const data = await AsyncStorage.getItem(TODO_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting todos:', error);
    return [];
  }
};

/**
 * Add a new todo
 */
export const addTodo = async (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>): Promise<Todo> => {
  try {
    const todos = await getAllTodos();
    const newTodo: Todo = {
      ...todo,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    todos.push(newTodo);
    await AsyncStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
    return newTodo;
  } catch (error) {
    console.error('Error adding todo:', error);
    throw error;
  }
};

/**
 * Update an existing todo
 */
export const updateTodo = async (id: string, updates: Partial<Todo>): Promise<Todo | null> => {
  try {
    const todos = await getAllTodos();
    const index = todos.findIndex(t => t.id === id);
    if (index === -1) return null;

    const updatedTodo: Todo = {
      ...todos[index],
      ...updates,
      id: todos[index].id,
      createdAt: todos[index].createdAt,
      updatedAt: new Date().toISOString(),
    };
    todos[index] = updatedTodo;
    await AsyncStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
    return updatedTodo;
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
};

/**
 * Delete a todo
 */
export const deleteTodo = async (id: string): Promise<boolean> => {
  try {
    const todos = await getAllTodos();
    const filtered = todos.filter(t => t.id !== id);
    await AsyncStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};

/**
 * Toggle todo completion status
 */
export const toggleTodoComplete = async (id: string): Promise<Todo | null> => {
  try {
    const todos = await getAllTodos();
    const todo = todos.find(t => t.id === id);
    if (!todo) return null;

    return await updateTodo(id, { completed: !todo.completed });
  } catch (error) {
    console.error('Error toggling todo:', error);
    throw error;
  }
};

/**
 * Get todos by category
 */
export const getTodosByCategory = async (category: string): Promise<Todo[]> => {
  try {
    const todos = await getAllTodos();
    return todos.filter(t => t.category === category);
  } catch (error) {
    console.error('Error getting todos by category:', error);
    return [];
  }
};

/**
 * Get todos by priority
 */
export const getTodosByPriority = async (priority: 'high' | 'medium' | 'low'): Promise<Todo[]> => {
  try {
    const todos = await getAllTodos();
    return todos.filter(t => t.priority === priority);
  } catch (error) {
    console.error('Error getting todos by priority:', error);
    return [];
  }
};

/**
 * Get incomplete todos
 */
export const getIncompleteTodos = async (): Promise<Todo[]> => {
  try {
    const todos = await getAllTodos();
    return todos.filter(t => !t.completed);
  } catch (error) {
    console.error('Error getting incomplete todos:', error);
    return [];
  }
};

/**
 * Clear all todos
 */
export const clearAllTodos = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(TODO_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing todos:', error);
    throw error;
  }
};
