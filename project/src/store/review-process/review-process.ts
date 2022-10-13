import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { ReviewProcess } from '../../types/state';
import { fetchReviewsAction } from '../api-actions';

const initialState: ReviewProcess = {
  isReviewsDataLoaded: false,
  reviews: [],
};

export const reviewProcess = createSlice({
  name: NameSpace.Review,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.pending, (state) => {
        state.isReviewsDataLoaded = false;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.isReviewsDataLoaded = true;
        state.reviews = action.payload;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.isReviewsDataLoaded = false;
      });
  }
});
