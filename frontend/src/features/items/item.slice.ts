import { createSlice } from '@reduxjs/toolkit';
import { fetchItems, createItem, updateItemById, deleteItemById } from './item.thunk';
import { Item } from './item.type';
import Swal from 'sweetalert2'

interface ItemsState {
  items: Item[];
  loading: boolean;
  error: string | null;
}

const initialState: ItemsState = {
  items: [],
  loading: false,
  error: null,
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch all items
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchItems.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchItems.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch items';
    });

    // Create a new item
    builder.addCase(createItem.fulfilled, (state, action) => {
      Array.isArray(action.payload) ? state.items.push(...action.payload) : state.items.push(action.payload);
      state.loading = false;
      Swal.fire({
        title: "Item Added Successfully!",
        text: "The item has been successfully added to the list.",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
        timer: 3000,
        showConfirmButton: true,
      }).then(() => {
        window.location.reload();
      });
    });
    builder.addCase(createItem.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to create item';
      
      const payload = action.payload as { error: { issues: { path: string[], message: string }[] } };

      const validationErrors = payload.error.issues
      .map(issue => `${issue.path.join('.')} - ${issue.message}`)
      .join('\n');
    
      Swal.fire({
        title: "Error!",
        text: validationErrors || 'Failed to create item',
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
        timer: 3000,
        showConfirmButton: true,
      });
    });

    // Update an item
    builder.addCase(updateItemById.fulfilled, (state, action) => {
      
      const updatedItem = Array.isArray(action.payload) ? action.payload[0] : action.payload;
      const index = state.items.findIndex((item) => item.id === updatedItem.id);
      if (index !== -1) {
        state.items[index] = updatedItem;
      }
      state.loading = false;
      Swal.fire({
        title: "Item Updated Successfully!",
        text: "The item has been successfully updated.",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
        timer: 3000,
        showConfirmButton: true,
      });
    });
    builder.addCase(updateItemById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateItemById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to update item';

      const payload = action.payload as { error: { issues: { path: string[], message: string }[] } };

      const validationErrors = payload.error.issues
      .map(issue => `${issue.path.join('.')} - ${issue.message}`)
      .join('\n');
    
      Swal.fire({
        title: "Error!",
        text: validationErrors || 'Failed to create item',
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
        timer: 3000,
        showConfirmButton: true,
      });
    });

    // Delete an item
    builder.addCase(deleteItemById.fulfilled, (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
      state.loading = false;
    });
    builder.addCase(deleteItemById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteItemById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to delete item';
    });
  },
});

export default itemsSlice.reducer;
