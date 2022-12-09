import { NameSpace } from '../../const';
import { ProductType } from '../../types/product';
import { State } from '../../types/state';
import { createSelector } from 'reselect';

export const getPageUpdateStatus = (state: State): boolean => state[NameSpace.Filters].pageUpdate;
export const getAllProducts = (state: State): ProductType[] => state[NameSpace.Filters].allProducts;
export const getFilters = (state: State) => state[NameSpace.Filters].extraFilters;
export const getFilteredPrices = (state: State) => state[NameSpace.Filters].filteredProducts;

export const getProductsByPriceAsc = createSelector(
  getFilteredPrices,
  (products) => {
    const productsByPrice = products?.slice();
    productsByPrice?.sort((a, b) => a.price - b.price);
    return productsByPrice;
  }
);
export const getProductsByPriceDesc = createSelector(
  getFilteredPrices,
  (products) => {
    const productsByPrice = products?.slice();
    productsByPrice?.sort((a, b) => b.price - a.price);
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
