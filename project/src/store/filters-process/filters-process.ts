import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { FiltersProcess } from '../../types/state';
import { fetchAllProductsAction } from '../api-actions';


export const filtersInitialState: FiltersProcess = {
  paramsSetup: '' as unknown,
  paramsUpdate: false,
  clearInputs: false,
  allProducts: [],
};

export const filtersProcess = createSlice({
  name: NameSpace.Utils,
  initialState: filtersInitialState,
  reducers: {
    paramsSetter(state, action) {
      state.paramsSetup = action.payload as unknown;
      state.paramsUpdate = !state.paramsUpdate;
    },
    fieldCleaner(state) {
      state.clearInputs = !state.clearInputs;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAllProductsAction.fulfilled, (state, action) => {
        state.allProducts = action.payload;
      });
  }
});

export default filtersProcess.reducer;
export const { fieldCleaner, paramsSetter} = filtersProcess.actions;
