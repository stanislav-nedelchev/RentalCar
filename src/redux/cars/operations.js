import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://car-rental-api.goit.global';

export const fetchCars = createAsyncThunk(
  'cars/fetchCars',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('/cars');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchCarById = createAsyncThunk(
  'cars/fetchCarById',
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.get(`/cars/${id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchBrands = createAsyncThunk(
  'cars/fetchBrands',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('/brands');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
