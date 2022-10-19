import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { productProcess } from './product-process/product-process';
import { reviewProcess } from './review-process/review-process';
import { utilsProcess } from './utils-process/utils-process';

export const rootReducer = combineReducers({
  [NameSpace.Product]: productProcess.reducer,
  [NameSpace.Utils]: utilsProcess.reducer,
  [NameSpace.Review]: reviewProcess.reducer,
});
