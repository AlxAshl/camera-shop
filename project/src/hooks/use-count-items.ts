import { useState, useEffect } from 'react';
import { BasketProductType } from '../types/product';

export const useCountItems = (array: BasketProductType[]) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let cleanCount = 0;
    if(array.length === 0) {
      setCount(0);
    }
    array.forEach((item) => {
      cleanCount = cleanCount + item.quantity;
      setCount(cleanCount);
    });
  },[array, count]);
  return count;
};
