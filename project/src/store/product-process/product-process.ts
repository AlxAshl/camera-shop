import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { ProductType } from '../../types/product';
import { ProductProcess } from '../../types/state';
import { fetchSimilarProductsAction, fetchProductAction, fetchProductsAction, fetchSearchSuggestionsAction, fetchAllProductsAction } from '../api-actions';


export const productInitialState: ProductProcess = {
  isProductsDataLoaded: false,
  isProductDataLoaded: false,
  productCount: 0,
  products: [],
  allProducts: [],
  searchSuggestions: [],
  similarProducts: [],
  product: {} as ProductType,
};

export const productProcess = createSlice({
  name: NameSpace.Product,
  initialState: productInitialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAllProductsAction.fulfilled, (state, action) => {
        state.allProducts = action.payload;
      })
      .addCase(fetchProductsAction.pending, (state) => {
        state.isProductsDataLoaded = false;
      })
      .addCase(fetchProductsAction.fulfilled, (state, action) => {
        state.isProductsDataLoaded = true;
        state.products = action.payload.data;
        state.productCount = Number(action.payload.header);
      })
      .addCase(fetchProductsAction.rejected, (state) => {
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
      .addCase(fetchSimilarProductsAction.pending, (state) => {
        state.isProductDataLoaded = false;
      })
      .addCase(fetchSimilarProductsAction.fulfilled, (state, action) => {
        state.isProductDataLoaded = true;
        state.similarProducts = action.payload;
      })
      .addCase(fetchSimilarProductsAction.rejected, (state) => {
        state.isProductDataLoaded = false;
      })
      .addCase(fetchSearchSuggestionsAction.fulfilled, (state, action) => {
        state.isProductsDataLoaded = true;
        state.searchSuggestions = action.payload;
      });
  }
});

export default productProcess.reducer;
