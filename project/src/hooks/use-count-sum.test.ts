import { basketProductsMock } from '../test/test-mocks';
import { renderHook } from '@testing-library/react';
import { useCountSum } from './use-count-sum';

describe('useCountSum hook', () => {
  const basketProducts = basketProductsMock;
  test('should return correct sums from products array', () =>{
    const {result} = renderHook(() => useCountSum(basketProducts, 15));
    expect(result.current.sum).toBe(158000);
    expect(result.current.discountSum).toBe(23700);
    expect(result.current.discountedTotalSum).toBe(134300);
  });
  test('should not return incorrect sums from products array', () =>{
    const {result} = renderHook(() => useCountSum(basketProducts, 15));
    expect(result.current).not.toBe(0);
    expect(result.current).not.toBe(0);
    expect(result.current).not.toBe(0);
  });
});
