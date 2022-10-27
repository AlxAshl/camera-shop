
import { cleanup } from '@testing-library/react';
import { productMock, productsMock } from '../../test/test-mocks';
import { ProductType, PromoType } from '../../types/product';
import { fetchProductAction, fetchSimilarProductsAction } from '../api-actions';
import { store } from '../store';
import reducer, { fetchProductsAction } from './product-process';

describe('Reducer: productProcess', () => {
  beforeAll(()=>{
    store.getState();
    cleanup();
  });
  test('without additional parameters should return initial state', () => {
    expect(reducer(void 0, {type:'UNKNOWN_ACTION'}))
      .toEqual({
        isProductsDataLoaded: false,
        isProductDataLoaded: false,
        isPromoDataLoaded: false,
        currentPage: 1,
        productCount: 0,
        products: [],
        similarProducts: [],
        product: {} as ProductType,
        promo: {} as PromoType
      });
  });

  test('should update products after fetching products action', () => {
    const state = {
      isProductsDataLoaded: false,
      isProductDataLoaded: false,
      isPromoDataLoaded: false,
      currentPage: 1,
      productCount: 0,
      products: [],
      similarProducts: [],
      product: {} as ProductType,
      promo: {} as PromoType
    };
    expect(reducer(state, {type: fetchProductsAction.fulfilled.type, payload: productsMock}))
      .toEqual({
        isProductsDataLoaded: true,
        isProductDataLoaded: false,
        isPromoDataLoaded: false,
        currentPage: 1,
        productCount: 0,
        products: productsMock,
        similarProducts: [],
        product: {} as ProductType,
        promo: {} as PromoType
      });
  });

  test('should update product after fetching product action', () => {
    const state = {
      isProductsDataLoaded: false,
      isProductDataLoaded: false,
      isPromoDataLoaded: false,
      currentPage: 1,
      productCount: 0,
      products: [],
      similarProducts: [],
      product: {} as ProductType,
      promo: {} as PromoType
    };
    expect(reducer(state, {type: fetchProductAction.fulfilled.type, payload: productMock}))
      .toEqual({
        isProductsDataLoaded: false,
        isProductDataLoaded: true,
        isPromoDataLoaded: false,
        currentPage: 1,
        productCount: 0,
        products: [],
        similarProducts: [],
        product: productMock as ProductType,
        promo: {} as PromoType
      });
  });

  test('should update similarproducts after fetching similarproducts action', () => {
    const state = {
      isProductsDataLoaded: false,
      isProductDataLoaded: false,
      isPromoDataLoaded: false,
      currentPage: 1,
      productCount: 0,
      products: [],
      similarProducts: [],
      product: {} as ProductType,
      promo: {} as PromoType
    };
    expect(reducer(state, {type: fetchSimilarProductsAction.fulfilled.type, payload: productsMock}))
      .toEqual({
        isProductsDataLoaded: false,
        isProductDataLoaded: true,
        isPromoDataLoaded: false,
        currentPage: 1,
        productCount: 0,
        products: [],
        similarProducts: productsMock,
        product: {} as ProductType,
        promo: {} as PromoType
      });
  });
});


