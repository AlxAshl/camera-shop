import { basketProductsMock } from '../test/test-mocks';
import { useCountItems } from './use-count-items';
import {renderHook} from '@testing-library/react';

describe('useCountItems hook', () => {
  const basketProducts = basketProductsMock;
  test('should return correct itmes count from products array', () =>{
    const {result} = renderHook(() => useCountItems(basketProducts));
    expect(result.current).toBe(3);
  });
  test('should not return incorrect count from products array', () =>{
    const {result} = renderHook(() => useCountItems(basketProducts));
    expect(result.current).not.toBe(0);
  });
});
