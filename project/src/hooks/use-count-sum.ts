import { useState, useEffect } from 'react';
import { BasketProductType } from '../types/product';

export const useCountSum = (array: BasketProductType[], discount: number) => {
  const [sum, setSum] = useState(0);
  useEffect(() => {
    let cleanCount = 0;
    if(array.length === 0) {
      setSum(0);
    }
    array.forEach((item) => {
      cleanCount = cleanCount + item.quantity * item.price;
      setSum(cleanCount);
    });
  },[array]);
  const discountSum = Math.round(sum / 100 * discount);
  const discountedTotalSum = sum - discountSum;
  return {sum, discountSum, discountedTotalSum};
};
