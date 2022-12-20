
import { cleanup } from '@testing-library/react';
import { reviewsMock } from '../../test/test-mocks';
import { fetchReviewsAction, postReviewAction } from '../api-actions';
import { store } from '../store';
import reducer from './review-process';

describe('Reducer: reviewProcess', () => {
  beforeAll(()=>{
    store.getState();
    cleanup();
  });
  test('without additional parameters should return initial state', () => {
    expect(reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        isReviewsDataLoaded: false,
        isReviewPosted: true,
        reviews: [],
        showReview: false,
        showReviewSuccess: false,
      });
  });

  test('should update reviews after fetching reviews action', () => {
    const state = {
      isReviewsDataLoaded: false,
      isReviewPosted: true,
      reviews: [],
      showReview: false,
      showReviewSuccess: false,
    };
    expect(reducer(state, {type: fetchReviewsAction.fulfilled.type, payload: reviewsMock}))
      .toEqual({
        isReviewsDataLoaded: true,
        isReviewPosted: true,
        reviews: reviewsMock,
        showReview: false,
        showReviewSuccess: false,
      });
  });
  test('should update state after posting review', () => {
    const state = {
      isReviewsDataLoaded: false,
      isReviewPosted: true,
      reviews: [],
      showReview: false,
      showReviewSuccess: false,
    };
    expect(reducer(state, {type: postReviewAction.pending.type}))
      .toEqual({
        isReviewsDataLoaded: false,
        isReviewPosted: false,
        reviews: [],
        showReview: false,
        showReviewSuccess: false,
      });
  });
});
