import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (_, { getState }) => {
  const state: any = getState();
  const token = state.auth.token;
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/tasks`, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
});

export const createTask = createAsyncThunk('tasks/createTask', async (task: { title: string; description?: string; status: string }, { getState }) => {
  const state: any = getState();
  const token = state.auth.token;
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/tasks`, task, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async (task: { id: number; title: string; description?: string; status: string }, { getState }) => {
  const state: any = getState();
  const token = state.auth.token;
  const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/tasks/${task.id}`, task, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id: number, { getState }) => {
  const state: any = getState();
  const token = state.auth.token;
  await axios.delete(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`, { headers: { Authorization: `Bearer ${token}` } });
  return id;
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((t: any) => t.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((t: any) => t.id !== action.payload);
      });
  },
});

export default taskSlice.reducer;