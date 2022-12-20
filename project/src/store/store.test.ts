import { store } from './store';
import { utilsInitialState } from './utils-process/utils-process';
import { productInitialState } from './product-process/product-process';
import { reviewInitialState } from './review-process/review-process';
import { complementaryInitiastate } from './complementary-process/complementary-process';
import { filtersInitialState } from './filters-process/filters-process';
import { basketInitialState } from './basket-process/basket-process';


describe('store test', ()=> {
  test('configures store correctly', () => {
    const state = store.getState();
    expect(state).toEqual({
      PRODUCT: productInitialState,
      UTILS: utilsInitialState,
      REVIEW: reviewInitialState,
      COMPLEMENTARY: complementaryInitiastate,
      FILTERS: filtersInitialState,
      BASKET: basketInitialState
    });
  });
});


