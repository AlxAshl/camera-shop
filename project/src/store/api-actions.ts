import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, PAGE_LIMIT } from '../const';
import { ProductType, PromoType } from '../types/product';
import { ReviewPostType, ReviewType } from '../types/review';
import { AppDispatch, State } from '../types/state';
// import { getLoadedProductStatus } from './product-process/selectors';
// import { useAppSelector } from '../hooks/useAppSelector';
// import { store } from './store';

// const mystate = store.getState();

// // eslint-disable-next-line no-console
// console.log(mystate);
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
//----------------SEARCHSUGGESTIONS---------------------------//
export const fetchSearchSuggestionsAction = createAsyncThunk<ProductType[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'product/fetchSearhSuggestions',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<ProductType[]>(`${APIRoute.Products}`);
    return data;
  },
);
//----------------SEARCHSUGGESTIONS---------------------------//
export const fetchProductsAction = createAsyncThunk<ProductsActionType, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'product/fetchProducts',
  async (currentPage, {extra: api}) => {
    const response = await api.get(`${APIRoute.Products}?_limit=${PAGE_LIMIT}&_page=${currentPage}`);
    const data = response.data as ProductType[];
    const header = response.headers['x-total-count'];
    return {data, header} as ProductsActionType;
  },
);
// cameras?limit=9&_page=1&category=Фотоаппарат&level=Нулевой
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

export {fetchSimilarProductsAction, fetchProductAction, fetchPromoAction, fetchReviewsAction, postReviewAction, };
