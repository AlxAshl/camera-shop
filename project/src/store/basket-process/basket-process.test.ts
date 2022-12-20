import { cleanup } from '@testing-library/react';
import { postCouponAction } from '../api-actions';
import { store } from '../store';
import reducer from './basket-process';

describe('Reducer: complementaryProcess', () => {
  beforeAll(()=>{
    store.getState();
    cleanup();
  });
  test('without additional parameters should return initial state', () => {
    expect(reducer(void 0, {type:'UNKNOWN_ACTION'}))
      .toEqual({
        showCart: false,
        showCartSuccess: false,
        showRemoveProduct: false,
        showBasketSuccess: false,
        productId: '',
        basketProducts: [],
        totalQuantity: 0,
        couponDiscount: 0,
      });
  });

  test('should update couponDiscount after fetching coupon action', () => {
    const state = {
      showCart: false,
      showCartSuccess: false,
      showRemoveProduct: false,
      showBasketSuccess: false,
      productId: '',
      basketProducts: [],
      totalQuantity: 0,
      couponDiscount: 0,
    };
    expect(reducer(state, {type: postCouponAction.fulfilled.type, payload: 15}))
      .toEqual({
        showCart: false,
        showCartSuccess: false,
        showRemoveProduct: false,
        showBasketSuccess: false,
        productId: '',
        basketProducts: [],
        totalQuantity: 0,
        couponDiscount: 15,
      });
  });
});
