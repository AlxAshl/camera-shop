import { useEffect, useState } from 'react';
import { BasketProductType } from '../types/product';

export default function useProductBasketStatus(array: BasketProductType[], id: number) {
  const [inBasket, setInBasket] = useState(false);
  useEffect(()=> {
    array.forEach((arrayElement) => {
      if(arrayElement.id === id) {
        setInBasket(true);
      }
    });
  },[array, id]);
  return inBasket;
}
