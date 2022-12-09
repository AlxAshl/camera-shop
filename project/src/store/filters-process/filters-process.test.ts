import { cleanup } from '@testing-library/react';
import { productsMock } from '../../test/test-mocks';
import { fetchAllProductsAction } from '../api-actions';
import { store } from '../store';
import reducer from './filters-process';

describe('Reducer: filtersProcess', () => {
  beforeAll(()=>{
    store.getState();
    cleanup();
  });

  test('without additional parameters should return initial state', () => {
    expect(reducer(void 0, {type:'UNKNOWN_ACTION'}))
      .toEqual({
        pageUpdate: false,
        allProducts: [],
        filteredProducts: [],
        extraFilters: {
          minprice: [] as string[],
          maxprice: [] as string[],
          sort: [] as string[],
          order: [] as string[],
          search: [] as string[],
          level: [] as string[],
          category: [] as string[],
          type: [] as string[]
        }
      });
  });

  test('should update products after fetching products action', () => {
    const state = {
      pageUpdate: false,
      allProducts: [],
      filteredProducts: [],
      extraFilters: {
        minprice: [] as string[],
        maxprice: [] as string[],
        sort: [] as string[],
        order: [] as string[],
        search: [] as string[],
        level: [] as string[],
        category: [] as string[],
        type: [] as string[]
      }
    };
    expect(reducer(state, {type: fetchAllProductsAction.fulfilled.type, payload: productsMock}))
      .toEqual({
        pageUpdate: false,
        allProducts: productsMock,
        filteredProducts: [],
        extraFilters: {
          minprice: [] as string[],
          maxprice: [] as string[],
          sort: [] as string[],
          order: [] as string[],
          search: [] as string[],
          level: [] as string[],
          category: [] as string[],
          type: [] as string[]
        }
      });
  });

});
