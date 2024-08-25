import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import taskService from "../services/taskServices";

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (token, thunkAPI) => {
    try {
      console.log("Fetching tasks with token:", token);
      const response = await taskService.getAllTasks(token);
      // console.log("Tasks fetched successfully:", response);
      return response;
    } catch (error) {
      console.error("Error fetching tasks:", error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Fetch a single task by ID
export const fetchTaskById = createAsyncThunk(
  "tasks/fetchTaskById",
  async ({ token, taskId }, thunkAPI) => {
    try {
      console.log("Fetching task by ID:", taskId, "with token:", token);
      const response = await taskService.getTaskById(token, taskId);
      // console.log("Task fetched successfully:", response);
      return response;
    } catch (error) {
      console.error("Error fetching task by ID:", error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Create a new task
export const createTask = createAsyncThunk(
  "tasks/createTask",
  async ({ token, taskData }, thunkAPI) => {
    try {
      console.log("Creating task with data:", taskData);
      const response = await taskService.createTask(token, taskData);
      console.log("Task created successfully:", response);
      return response;
    } catch (error) {
      console.error("Error creating task:", error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Update a task
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ token, taskId, taskData }, thunkAPI) => {
    try {
      console.log("Updating task ID:", taskId, "with data:", taskData);
      const response = await taskService.updateTask(token, taskId, taskData);
      console.log("Task updated successfully:", response);
      return response;
    } catch (error) {
      console.error("Error updating task:", error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Delete a task
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async ({ token, taskId }, thunkAPI) => {
    try {
      console.log("Deleting task ID:", taskId);
      const response = await taskService.deleteTask(token, taskId);
      console.log("Task deleted successfully:", response);
      return response;
    } catch (error) {
      console.error("Error deleting task:", error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Task Slice
const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    currentTask: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetTaskState: (state) => {
      state.tasks = [];
      state.currentTask = null;
      state.error = null;
      console.log("Task state reset");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        console.log("Fetching tasks started");
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        console.log("Fetching tasks fulfilled with data:", action.payload);
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        console.error("Fetching tasks rejected with error:", action.payload);
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTaskById.pending, (state) => {
        console.log("Fetching task by ID started");
        state.loading = true;
      })
      .addCase(fetchTaskById.fulfilled, (state, action) => {
        console.log("Fetching task by ID fulfilled with data:", action.payload);
        state.loading = false;
        state.currentTask = action.payload;
      })
      .addCase(fetchTaskById.rejected, (state, action) => {
        console.error(
          "Fetching task by ID rejected with error:",
          action.payload
        );
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTask.pending, (state) => {
        console.log("Creating task started");
        state.loading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        console.log("Creating task fulfilled with data:", action.payload);
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        console.error("Creating task rejected with error:", action.payload);
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTask.pending, (state) => {
        console.log("Updating task started");
        state.loading = true;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        console.log("Updating task fulfilled with data:", action.payload);
        state.loading = false;
        state.tasks = state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        );
      })
      .addCase(updateTask.rejected, (state, action) => {
        console.error("Updating task rejected with error:", action.payload);
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteTask.pending, (state) => {
        console.log("Deleting task started");
        state.loading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        console.log(
          "Deleting task fulfilled with data:",
          action.meta.arg.taskId
        );
        state.loading = false;
        state.tasks = state.tasks.filter(
          (task) => task._id !== action.meta.arg.taskId
        );
      })
      .addCase(deleteTask.rejected, (state, action) => {
        console.error("Deleting task rejected with error:", action.payload);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetTaskState } = taskSlice.actions;

export default taskSlice.reducer;
