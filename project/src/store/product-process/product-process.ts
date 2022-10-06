import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { ProductProcess } from '../../types/state';
import { fetchProductAction } from '../api-actions';

const initialState: ProductProcess = {
  isDataLoaded: false,
  products: [],
};


export const productProcess = createSlice({
  name: NameSpace.Product,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProductAction.pending, (state) => {
        state.isDataLoaded = false;
      })
      .addCase(fetchProductAction.fulfilled, (state, action) => {
        state.isDataLoaded = true;
        state.products = action.payload;
      });
  }

});
