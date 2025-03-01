import { createSlice } from '@reduxjs/toolkit';
import { fetchBrands, fetchCarById, fetchCars } from '../operations.js';

const carsSlice = createSlice({
  name: 'cars',
  initialState: {
    items: [],
    brands: [],
    loading: false,
    error: null,
    page: 1,
    totalPages: 1,
  },

  // reducers: {
  //   clearCars: state => {
  //           state.items = [];
  //   },
  // },

  extraReducers: builder =>
    builder
      .addCase(fetchCars.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        console.log('Fetched Cars:', action.payload);
        console.log('Page:', action.payload.page);
        state.loading = false;
        state.error = null;
        state.items = action.payload.cars;
        state.totalPages = action.payload.totalPages;
        state.page = action.payload.page;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCarById.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.loading = false;
        state.items = [action.payload];
      })
      .addCase(fetchCarById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchBrands.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
});

// export const { clearCars } = carsSlice.actions;
export const carsReducer = carsSlice.reducer;
