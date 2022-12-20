import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, PAGE_LIMIT } from '../const';
import { CouponType, OrderData } from '../types/order';
import { ProductType, PromoType } from '../types/product';
import { ReviewPostType, ReviewType } from '../types/review';
import { AppDispatch, State } from '../types/state';


const fetchSimilarProductsAction = createAsyncThunk<ProductType[], number, {
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

const fetchProductAction = createAsyncThunk<ProductType, number, {
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
type ProductsActionType = {
  data: ProductType[];
  header: string;
}

export const fetchAllProductsAction = createAsyncThunk<ProductType[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'product/fetchAllProducts',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<ProductType[]>(`${APIRoute.Products}`);
    return data;
  }
);

export const fetchFilteredProductsAction = createAsyncThunk<ProductType[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'product/fetchFilteredProducts',
  async (params, {extra: api}) => {
    const {data} = await api.get<ProductType[]>(`${APIRoute.Products}?${(params ? `&${params}` : '')}`);
    return data;
  }
);

type fetchParamsType = {
  currentPage: number;
  urlParams? : string;
}
export const fetchProductsAction = createAsyncThunk<ProductsActionType, fetchParamsType, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'product/fetchProducts',
  async (params, {extra: api}) => {
    const response = await api.get(`${APIRoute.Products}?_limit=${PAGE_LIMIT}&_page=${params.currentPage}${(params.urlParams ? `&${params.urlParams}` : '')}`);
    const data = response.data as ProductType[];
    const header = response.headers['x-total-count'];
    return {data, header} as ProductsActionType;
  },
);

const fetchPromoAction = createAsyncThunk<PromoType, undefined, {
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

const fetchReviewsAction = createAsyncThunk<ReviewType[], number, {
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

const postReviewAction = createAsyncThunk<unknown, ReviewPostType, {
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

const postCouponAction = createAsyncThunk<unknown, CouponType, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'basket/postCoupon',
  async (coupon, {extra: api}) => {
    const response = await api.post<CouponType>('/coupons', coupon);
    return response.data;
  }
);

const postOrderAction = createAsyncThunk<unknown, OrderData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'basket/postOrder',
  async (orderData, {extra: api}) => {
    const response = await api.post<OrderData>('/orders', orderData);
    return response.data;
  }
);

export {fetchSimilarProductsAction, fetchProductAction, fetchPromoAction, fetchReviewsAction, postReviewAction, postCouponAction, postOrderAction};
