import { store } from '../store';
import { MessageType } from './message';
import { ProductType } from './product';

export type ProductProcess = {
  isDataLoaded: boolean;
  products: ProductType[];
}

export type UiProcess = {
  showMessage: boolean;
  message: MessageType;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
