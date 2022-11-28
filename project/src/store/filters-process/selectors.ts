import { NameSpace } from '../../const';
import { ProductType } from '../../types/product';
import { State } from '../../types/state';
import { createSelector } from 'reselect';

export const getParamsUpdateStatus = (state: State): boolean => state[NameSpace.Filters].paramsUpdate;
export const getParams = (state: State): unknown => state[NameSpace.Filters].paramsSetup;
export const getCleanUpStatus = (state: State): boolean => state[NameSpace.Filters].clearInputs;
export const getAllProducts = (state: State): ProductType[] => state[NameSpace.Filters].allProducts;
export const getProductsByPrice = createSelector(
  getAllProducts,
  (products) => {
    const productsByPrice = products?.slice();
    productsByPrice?.sort((a, b) => a.price - b.price);
    return productsByPrice;
  }
);
export const getProductsAlphabetic = createSelector(
  getAllProducts,
  (products) => {
    const productsAlphabetic = products?.slice();
    productsAlphabetic?.sort((a, b) => a.name.localeCompare(b.name));
    return productsAlphabetic;
  }
);
