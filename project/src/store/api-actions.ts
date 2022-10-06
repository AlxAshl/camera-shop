import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../const';
import { ProductType } from '../types/product';
import { AppDispatch, State } from '../types/state';

export const fetchProductAction = createAsyncThunk<ProductType[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'product/fetchProducts',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<ProductType[]>(APIRoute.Products);
    return data;
  },
);
