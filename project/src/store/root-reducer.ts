import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { basketProcess } from './basket-process/basket-process';

import {complementaryProcess} from './complementary-process/complementary-process';
import { filtersProcess } from './filters-process/filters-process';
import { productProcess } from './product-process/product-process';
import { reviewProcess } from './review-process/review-process';
import { utilsProcess } from './utils-process/utils-process';

export const rootReducer = combineReducers({
  [NameSpace.Product]: productProcess.reducer,
  [NameSpace.Utils]: utilsProcess.reducer,
  [NameSpace.Review]: reviewProcess.reducer,
  [NameSpace.Complementary]: complementaryProcess.reducer,
  [NameSpace.Filters]: filtersProcess.reducer,
  [NameSpace.Basket]: basketProcess.reducer,
});
