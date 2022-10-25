import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { ProductType, PromoType } from '../../types/product';
import { ProductProcess } from '../../types/state';
import { fetchSimilarProductsAction, fetchProductsAction, fetchPromoAction, fetchProductAction } from '../api-actions';

const initialState: ProductProcess = {
  isProductsDataLoaded: false,
  isProductDataLoaded: false,
  isPromoDataLoaded: false,
  currentPage: 1,
  productCount: 0,
  products: [],
  product: {} as ProductType,
  promo: {} as PromoType
};

export const productProcess = createSlice({
  name: NameSpace.Product,
  initialState,
  reducers: {
    setProductCount(state, action) {
      state.productCount = action.payload as number;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload as number;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProductsAction.pending, (state) => {
        state.isProductsDataLoaded = false;
      })
      .addCase(fetchProductsAction.fulfilled, (state, action) => {
        state.isProductsDataLoaded = true;
        state.products = action.payload;
      })
      .addCase(fetchProductsAction.rejected, (state) => {
        state.isProductsDataLoaded = true;
      })
      .addCase(fetchSimilarProductsAction.pending, (state) => {
        state.isProductsDataLoaded = false;
      })
      .addCase(fetchSimilarProductsAction.fulfilled, (state, action) => {
        state.isProductsDataLoaded = true;
        state.products = action.payload;
      })
      .addCase(fetchSimilarProductsAction.rejected, (state) => {
        state.isProductsDataLoaded = true;
      })
      .addCase(fetchProductAction.pending, (state) => {
        state.isProductDataLoaded = false;
      })
      .addCase(fetchProductAction.fulfilled, (state, action) => {
        state.isProductDataLoaded = true;
        state.product = action.payload;
      })
      .addCase(fetchProductAction.rejected, (state) => {
        state.isProductDataLoaded = false;
      })
      .addCase(fetchPromoAction.pending, (state) => {
        state.isPromoDataLoaded = false;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.isPromoDataLoaded = true;
        state.promo = action.payload;
      })
      .addCase(fetchPromoAction.rejected, (state) => {
        state.isPromoDataLoaded = false;
      });
  }
});

export const {setProductCount, setCurrentPage} = productProcess.actions;
