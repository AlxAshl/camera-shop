
import { cleanup } from '@testing-library/react';
import { productMock } from '../../test/test-mocks';
import { PromoType } from '../../types/product';
import { fetchPromoAction } from '../api-actions';
import { store } from '../store';
import reducer from './complementary-process';

describe('Reducer: complementaryProcess', () => {
  beforeAll(()=>{
    store.getState();
    cleanup();
  });
  test('without additional parameters should return initial state', () => {
    expect(reducer(void 0, {type:'UNKNOWN_ACTION'}))
      .toEqual({
        isPromoDataLoaded: false,
        promo: {} as PromoType
      });
  });

  test('should update promo after fetching promo action', () => {
    const state = {
      isPromoDataLoaded: false,
      promo: {} as PromoType
    };
    expect(reducer(state, {type: fetchPromoAction.fulfilled.type, payload: productMock}))
      .toEqual({
        isPromoDataLoaded: true,
        promo: productMock as PromoType
      });
  });
});
