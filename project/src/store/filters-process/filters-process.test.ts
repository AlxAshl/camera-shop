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
        extraFilters: {
          PriceMin: [] as string[],
          PriceMax: [] as string[],
          Sort: [] as string[],
          Order: [] as string[],
          Search: [] as string[],
          Level: [] as string[],
          Category: [] as string[],
          Type: [] as string[]
        }
      });
  });

  test('should update products after fetching products action', () => {
    const state = {
      pageUpdate: false,
      allProducts: [],
      extraFilters: {
        PriceMin: [] as string[],
        PriceMax: [] as string[],
        Sort: [] as string[],
        Order: [] as string[],
        Search: [] as string[],
        Level: [] as string[],
        Category: [] as string[],
        Type: [] as string[]
      }
    };
    expect(reducer(state, {type: fetchAllProductsAction.fulfilled.type, payload: productsMock}))
      .toEqual({
        pageUpdate: false,
        allProducts: productsMock,
        extraFilters: {
          PriceMin: [] as string[],
          PriceMax: [] as string[],
          Sort: [] as string[],
          Order: [] as string[],
          Search: [] as string[],
          Level: [] as string[],
          Category: [] as string[],
          Type: [] as string[]
        }
      });
  });

});
