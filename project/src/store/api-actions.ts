import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { store } from '.';
import { APIRoute } from '../const';
import { ProductType, PromoType } from '../types/product';
import { AppDispatch, State } from '../types/state';
import { setProductCount } from './product-process/product-process';

export const fetchProductsAction = createAsyncThunk<ProductType[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'product/fetchProducts',
  async (_arg, {extra: api}) => {
    const response = await api.get(`${APIRoute.Products}/pages`);
    store.dispatch(setProductCount(response.headers['x-total-count']));
    return response.data as ProductType[];
  },
);
export const fetchAllProductsAction = createAsyncThunk<ProductType[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'product/fetchProducts',
  async (_arg, {extra: api}) => {
    const response = await api.get(`${APIRoute.Products}`);
    return response.data as ProductType[];
  },
);
export const fetchProductAction = createAsyncThunk<ProductType, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'product/fetchProduct',
  async (id, {extra: api}) => {
    const response = await api.get(`${APIRoute.Products}/${id}`);
    return response.data as ProductType;
  }
);
export const fetchPromoAction = createAsyncThunk<PromoType, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'product/fetchPromo',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<PromoType>(APIRoute.Promo);
    return data;
  },
);
