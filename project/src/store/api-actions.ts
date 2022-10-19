import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { store } from './store';
import { APIRoute } from '../const';
import { ProductType, PromoType } from '../types/product';
import { ReviewPostType, ReviewType } from '../types/review';
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

export const fetchSimilarProductsAction = createAsyncThunk<ProductType[], number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'product/fetchSimilarProducts',
  async (id: number, {extra: api}) => {
    const response = await api.get(`${APIRoute.Products}/${id}/similar`);
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

export const fetchReviewsAction = createAsyncThunk<ReviewType[], number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'review/fetchReviews',
  async (id, {extra: api}) => {
    const response = await api.get(`${APIRoute.Products}/${id}/reviews`);
    return response.data as ReviewType[];
  }
);

export const postReviewAction = createAsyncThunk<unknown, ReviewPostType, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'review/postReview',
  async (reviewData, {extra: api}) => {
    const response = await api.post<ReviewPostType>(`${APIRoute.Reviews}`, reviewData);
    return response;
  }
);
