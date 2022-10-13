import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { productProcess } from './product-process/product-process';
import { reviewProcess } from './review-process/review-process';
import { uiProcess } from './ui-process/ui-process';

export const rootReducer = combineReducers({
  [NameSpace.Product]: productProcess.reducer,
  [NameSpace.Ui]: uiProcess.reducer,
  [NameSpace.Review]: reviewProcess.reducer,
});
