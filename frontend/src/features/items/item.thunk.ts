import { createAsyncThunk } from '@reduxjs/toolkit';
import api from './item.api';
import { Item } from './item.type';
import { ZodError } from 'zod';
import { AxiosError } from 'axios';

export const fetchItems = createAsyncThunk('items/fetch', async () => {
  const response = await api.get<Item[]>('/items');
  return response.data;
});

export const createItem = createAsyncThunk('items/create', async (item: Partial<Item>, { rejectWithValue }) => {
    try {
      const response = await api.post<Item>('/items', item);
      return response.data;
    } catch (error) {
      if (error instanceof ZodError) {
        return rejectWithValue(error.errors);
      }
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: 'Something went wrong' });
    }
  }
);

export const updateItemById = createAsyncThunk('items/update', async (item: Partial<Item>, { rejectWithValue }) => {
  try {
    const response = await api.put<Item>(`/items/${item.id}`, item);
    return response.data;
  } catch (error) {
    if (error instanceof ZodError) {
      return rejectWithValue(error.errors);
    }
    if (error instanceof AxiosError && error.response) {
      return rejectWithValue(error.response.data);
    }
    return rejectWithValue({ message: 'Something went wrong' });
  }
});

export const deleteItemById = createAsyncThunk('items/delete', async (id: number) => {
  await api.delete(`/items/${id}`);
  return id;
});
