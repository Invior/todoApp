import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { changeTodoText,createTodo, deleteTodo, fetchTodos, toggleTodo } from '../../api/todos';
import type { RootState } from '../store';

export interface TodoType {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;
}

export interface DeleteTodoParams {
  id: number;
}

export interface ToggleTodoParams {
  id: number;
  completed: boolean;
}

export interface ChangeTodoParams {
  id: number;
  text: string;
}

export interface TodosData {
  data: TodoType[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  status: boolean;
  text: string;
}

interface TodosParams {
  page: number;
  limit: number;
}

interface CreateTodoParams {
  text: string;
}

const initialState: TodosData = {
  data: [],
  total: 0,
  page: 1,
  limit: 5,
  totalPages: 1,
  status: false,
  text: '',
};

export const getTodos = createAsyncThunk<TodosData, TodosParams>(
  'todo/fetchTodos',
  async ({ page, limit }) => {
    const res = await fetchTodos(page, limit);
    return res.data;
  },
);

export const createNewTodo = createAsyncThunk<TodoType, CreateTodoParams>(
  'todo/createNewTodo',
  async ({ text }) => {
    const res = await createTodo(text);
    return res.data;
  },
);

export const deleteThisTodo = createAsyncThunk<void, DeleteTodoParams>(
  'todo/deleteThisTodo',
  async ({ id }) => {
    await deleteTodo(id);
  },
);

export const toggleThisTodo = createAsyncThunk<TodoType, ToggleTodoParams>(
  'todo/toggleThisTodo',
  async ({ id, completed }) => {
    const response = await toggleTodo(id, completed);
    return response.data;
  },
);

export const editTextTodo = createAsyncThunk<TodoType, ChangeTodoParams>(
  'todo/editTextTodo',
  async ({ id, text }) => {
    const response = await changeTodoText(id, text);
    return response.data;
  },
);

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state) => {
        state.status = false;
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.status = true;
        state.data = action.payload.data;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getTodos.rejected, (state) => {
        state.status = false;
        state.data = [];
      })
      .addCase(createNewTodo.pending, (state) => {
        state.text = '';
      })
      .addCase(createNewTodo.fulfilled, (state, action) => {
        state.text = action.payload.text;
      })
      .addCase(createNewTodo.rejected, (state) => {
        state.text = '';
      })
      .addCase(deleteThisTodo.pending, (state) => {
        state.status = false;
      })
      .addCase(deleteThisTodo.fulfilled, (state, action) => {
        state.status = true;
        state.data = state.data.filter((todo) => todo.id !== action.meta.arg.id);
      })
      .addCase(deleteThisTodo.rejected, (state) => {
        state.status = false;
      })
      .addCase(toggleThisTodo.fulfilled, (state, action) => {
        const index = state.data.findIndex((todo) => todo.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(toggleThisTodo.rejected, (state) => {
        state.status = false;
      });
  },
});

export const selectTodosData = (state: RootState) => state.todos;
export const { setCurrentPage, setLimit } = todoSlice.actions;
export default todoSlice.reducer;
