import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as Tasks from "../../api/tasks";
import { Task } from "../../types";

export const createTask = createAsyncThunk(
  "task/create",
  async (task, thunkAPI) => {
    // Axios create task
  }
);

export const fetchTasks = createAsyncThunk<Task[], void>(
  "task/fetch",
  async () => {
    const res = await Tasks.getAll();
    return res.data;
  }
);

type TasksState = { isLoading: boolean; tasks: Task[]; error: string };

export const taskSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    tasks: [],
    error: "",
  } as TasksState,
  extraReducers: (builder) => [
    builder.addCase(fetchTasks.pending, (state) => {
      state.isLoading = true;
    }),
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tasks.push(...action.payload);
    }),
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.isLoading = false;
    }),
  ],
  reducers: {},
});

const { reducer } = taskSlice;

export default reducer;
