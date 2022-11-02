import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { PromoType } from '../../types/product';
import { ComplementaryProcess } from '../../types/state';
import { fetchPromoAction } from '../api-actions';


export const complementaryInitiastate: ComplementaryProcess = {
  isPromoDataLoaded: false,
  promo: {} as PromoType
};

export const complementaryProcess = createSlice({
  name: NameSpace.Complementary,
  initialState: complementaryInitiastate,
  reducers: {},
  extraReducers(builder) {
    builder
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

export default complementaryProcess.reducer;
