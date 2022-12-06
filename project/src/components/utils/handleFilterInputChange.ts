import { ActionCreatorWithNonInferrablePayload } from '@reduxjs/toolkit';
import { store } from '../../store/store';

export const handleFilterInputChange = (filterName: string, filter: string[], action: ActionCreatorWithNonInferrablePayload) => {
  const mutableFilter = Object.assign([], filter);
  if(filter.includes(filterName)) {
    const updatedFilter = mutableFilter.filter((entry) => entry !== filterName);
    store.dispatch(action(updatedFilter));
  }
  else {
    mutableFilter.push(filterName);
    store.dispatch(action(mutableFilter));
  }
};
