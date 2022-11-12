
import { cleanup } from '@testing-library/react';
import { productMock, productsMock } from '../../test/test-mocks';
import { ProductType } from '../../types/product';
import { fetchProductAction, fetchProductsAction, fetchSimilarProductsAction } from '../api-actions';
import { store } from '../store';
import reducer from './product-process';

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
        productCount: 0,
        products: [],
        searchSuggestions: [],
        similarProducts: [],
        product: {} as ProductType,
      });
  });

  test('should update products after fetching products action', () => {
    const state = {
      isProductsDataLoaded: false,
      isProductDataLoaded: false,
      productCount: 0,
      products: [],
      searchSuggestions: [],
      similarProducts: [],
      product: {} as ProductType,
    };
    const porductsMockPayload = {
      data: productsMock,
      header: '4'
    };
    expect(reducer(state, {type: fetchProductsAction.fulfilled.type, payload: porductsMockPayload}))
      .toEqual({
        isProductsDataLoaded: true,
        isProductDataLoaded: false,
        productCount: 4,
        searchSuggestions: [],
        products: productsMock,
        similarProducts: [],
        product: {} as ProductType,
      });
  });

  test('should update product after fetching product action', () => {
    const state = {
      isProductsDataLoaded: false,
      isProductDataLoaded: false,
      productCount: 0,
      products: [],
      searchSuggestions: [],
      similarProducts: [],
      product: {} as ProductType,
    };
    expect(reducer(state, {type: fetchProductAction.fulfilled.type, payload: productMock}))
      .toEqual({
        isProductsDataLoaded: false,
        isProductDataLoaded: true,
        productCount: 0,
        products: [],
        suggestedProducts: [],
        similarProducts: [],
        product: productMock as ProductType,
      });
  });

  test('should update similarproducts after fetching similarproducts action', () => {
    const state = {
      isProductsDataLoaded: false,
      isProductDataLoaded: false,
      productCount: 0,
      products: [],
      searchSuggestions: [],
      similarProducts: [],
      product: {} as ProductType,
    };
    expect(reducer(state, {type: fetchSimilarProductsAction.fulfilled.type, payload: productsMock}))
      .toEqual({
        isProductsDataLoaded: false,
        isProductDataLoaded: true,
        productCount: 0,
        products: [],
        searchSuggestions: [],
        similarProducts: productsMock,
        product: {} as ProductType,
      });
  });
});


