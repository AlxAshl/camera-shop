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
        paramsSetup: '' as unknown,
        paramsUpdate: false,
        clearInputs: false,
        allProducts: [],
      });
  });

  test('should update products after fetching products action', () => {
    const state = {
      paramsSetup: '' as unknown,
      paramsUpdate: false,
      clearInputs: false,
      allProducts: [],
    };
    expect(reducer(state, {type: fetchAllProductsAction.fulfilled.type, payload: productsMock}))
      .toEqual({
        paramsSetup: '' as unknown,
        paramsUpdate: false,
        clearInputs: false,
        allProducts: productsMock,
      });
  });

});
