import { basketProductsMock } from '../test/test-mocks';
import {renderHook} from '@testing-library/react';
import useProductBasketStatus from './use-product-basket-status';

describe('useProductBasketStatus hook', () => {
  const basketProducts = basketProductsMock;
  test('should return true state, item id is in basket', () =>{
    const {result} = renderHook(() => useProductBasketStatus(basketProducts, 1));
    expect(result.current).toBe(true);
  });
  test('should return false state, item is not in basket', () =>{
    const {result} = renderHook(() => useProductBasketStatus(basketProducts, 15));
    expect(result.current).toBe(false);
  });
});
