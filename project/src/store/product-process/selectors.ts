import { createSelector } from 'reselect';
import { NameSpace } from '../../const';
import { ProductType } from '../../types/product';
import { State } from '../../types/state';

export const getLoadedProductsStatus = (state: State): boolean => state[NameSpace.Product].isProductsDataLoaded;
export const getLoadedProductStatus = (state: State): boolean => state[NameSpace.Product].isProductDataLoaded;
export const getProducts = (state: State): ProductType[] => state[NameSpace.Product].products;
export const getSimilarProducts = (state: State): ProductType[] => state[NameSpace.Product].similarProducts;
export const getProduct = (state: State): ProductType => state[NameSpace.Product].product;
export const getProductCount = (state: State): number => state[NameSpace.Product].productCount;
export const getSearchSuggestions = (state: State): ProductType[] => state[NameSpace.Product].searchSuggestions;
export const getAllProducts = (state: State): ProductType[] => state[NameSpace.Product].allProducts;
export const getProductsByPrice = createSelector(
  getAllProducts,
  (products) => {
    const productsByPrice = products?.slice();
    productsByPrice?.sort((a, b) => a.price - b.price);
    return productsByPrice;
  }
);
