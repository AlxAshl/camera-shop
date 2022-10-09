import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { PromoType } from '../../types/product';
import { ProductProcess } from '../../types/state';
import { fetchProductAction, fetchPromoAction } from '../api-actions';

const initialState: ProductProcess = {
  isProductDataLoaded: false,
  isPromoDataLoaded: false,
  currentPage: 1,
  productCount: 0,
  products: [],
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
      .addCase(fetchProductAction.pending, (state) => {
        state.isProductDataLoaded = false;
      })
      .addCase(fetchProductAction.fulfilled, (state, action) => {
        state.isProductDataLoaded = true;
        state.products = action.payload;
      })
      .addCase(fetchProductAction.rejected, (state) => {
        state.isProductDataLoaded = true;
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
