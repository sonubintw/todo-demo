import axios from 'axios';
// import moment from 'moment';
// import {RootState} from './store';
import {
    createSlice,
    createAsyncThunk,
    PayloadAction,
    createSelector,
} from '@reduxjs/toolkit';


import { Todo, TodosState } from "./todoTypes";
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { getCurrentTimestamp, getRandomUUID } from '../../global/globalFunctions';
import { makeApiCall } from '../../global/makeApiCall';
import { RootState } from '../store';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../constants/apiRoutes';




const initialState: TodosState = {
    todos: [],
    status: 'idle',
    error: null,
    sortBy: 'id',
    filterBy: 'all',
};

//to make api call thunk
export const getTodos = createAsyncThunk(
    "todos/getTodos", //name
    async (_, { rejectWithValue }) => {
        const response = await makeApiCall("GET", `${BASE_URL}/todos`);
           
        if (response.error) {
            return rejectWithValue(response.error);
        }

        return response?.data?.map((todo: any) => ({
            ...todo,
            created_at: getCurrentTimestamp(),
            updated_at: getCurrentTimestamp(),
        }));
    }
);




const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    //add todo
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: getRandomUUID(),
        title: action.payload,
        completed: false,
        created_at: getCurrentTimestamp(),
        updated_at: getCurrentTimestamp(),
        userId: 1,
      };
      state.todos.unshift(newTodo);
    },

    //update todo
    updateTodo: (
      state,
      action: PayloadAction<{ id: string; title: string }>,
    ) => {
      const { id, title } = action.payload;
      const todo = state.todos.find(elem => elem.id === id);
      if (todo) {
        todo.title = title;
        todo.updated_at = getCurrentTimestamp();
      }
    },
    //toggle the completed status
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find(todo => todo.id == action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        todo.updated_at = getCurrentTimestamp();
      }
    },
    //delet todo
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },

    //filters actions
    setFilter: (state, action) => {
      state.filterBy = action.payload;
    },

    //sort actions
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },

  //to handle api call actions or async actions
  extraReducers: builder => {
    builder
      .addCase(getTodos.pending, state => {
        state.status = 'loading';
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.status = 'idle';
        state.todos = action.payload;
      })
      .addCase(getTodos.rejected, state => {
        state.status = 'failed';
      });
  },
});

//selectors
const selectAllTodos = (state: RootState) => state.todo.todos;
const selectFilterOptions = (state: RootState) => state.todo.filterBy;
const selectSortByOptions = (state: RootState) => state.todo.sortBy;

//get todos counts per total and completed
export const getTodoCounts = createSelector([selectAllTodos], todos => {
  const total = todos.length;
  const active = todos.filter(todo => !todo.completed).length;
  const completed = todos.filter(todo => todo.completed).length;
  return {total, active, completed};
});

//filter and sort functionalities
export const selectFilterAndSortedTodos = createSelector(
  [selectAllTodos, selectFilterOptions, selectSortByOptions],
  (todos, filterBy, sortBy) => {
    let filteredTodos = todos;
    if (filterBy === 'active') {
      filteredTodos = filteredTodos.filter(todo => !todo.completed);
    } else if (filterBy === 'done') {
      filteredTodos = filteredTodos.filter(todo => todo.completed);
    }

    //sortBy logic
    return filteredTodos.slice().sort((a, b) => {
      if (sortBy === 'recent') {
        return (
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
      }
      return Number(a.id) - Number(b.id);
    });
  },
);
//export actions
export const {
  addTodo,
  toggleTodo,
  deleteTodo,
  updateTodo,
  setFilter,
  setSortBy,
} = todoSlice.actions;


export default todoSlice.reducer;