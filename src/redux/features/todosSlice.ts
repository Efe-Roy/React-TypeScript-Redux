import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import {Todo} from '../types';

interface TodosState {
  data: Todo[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TodosState = {
  data: [],
  isLoading: false,
  error: null,
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    fetchTodosStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchTodosSuccess: (state, action: PayloadAction<Todo[]>) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    fetchTodosFailure: (state, action: PayloadAction<Error>) => {
      state.isLoading = false;
      state.error = action.payload.message;
      // You can also store the entire error object if needed
      // state.error = action.payload;
    },
    
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.data.push(action.payload);
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.data.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const {
  fetchTodosStart,
  fetchTodosSuccess,
  fetchTodosFailure,
  addTodo,
  updateTodo,
  deleteTodo,
} = todosSlice.actions;

export default todosSlice.reducer;

// Thunk for fetching todos from an API
export const fetchTodos = (): AppThunk => async (dispatch) => {
  try {
    dispatch(fetchTodosStart());
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const todos = await response.json();
    dispatch(fetchTodosSuccess(todos));
  } catch (error:any) {
    // dispatch(fetchTodosFailure(error.message));
    dispatch(fetchTodosFailure(error));
  }
};
