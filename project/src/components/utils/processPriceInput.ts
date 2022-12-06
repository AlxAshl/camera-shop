import { ActionCreatorWithNonInferrablePayload } from '@reduxjs/toolkit';
import { store } from '../../store/store';
import { ProductType } from '../../types/product';

export const setMinInput = (input: string, productsArray: ProductType[], action: ActionCreatorWithNonInferrablePayload) => {
  if(productsArray.find((product) => product.price === Number(input)) && productsArray.length !== 0) {
    store.dispatch(action([String(input)]));
  }
  if(!productsArray.find((product) => product.price === Number(input)) && productsArray.length !== 0) {
    let newMinPriceInput;
    const newMin = productsArray.find((product) => product.price <= Number(input));
    newMin?.price === undefined
      ? newMinPriceInput = productsArray[productsArray.length - 1].price
      : newMinPriceInput = newMin?.price;
    store.dispatch(action([String(newMinPriceInput)]));
  }
};

export const setMaxInput = (input: string, productsArray: ProductType[], action: ActionCreatorWithNonInferrablePayload) => {
  if(productsArray.find((product) => product.price === Number(input)) && productsArray.length !== 0) {
    store.dispatch(action([String(input)]));
  }
  if(!productsArray.find((product) => product.price === Number(input)) && productsArray.length !== 0) {
    let newMaxPriceInput;
    const newMax = productsArray.find((product) => product.price >= Number(input));
    newMax?.price === undefined
      ? newMaxPriceInput = productsArray[productsArray.length - 1].price
      : newMaxPriceInput = newMax?.price;
    store.dispatch(action([String(newMaxPriceInput)]));
  }
};
