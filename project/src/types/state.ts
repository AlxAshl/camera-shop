import { store } from '../store';
import { MessageType } from './message';
import { ProductType, PromoType } from './product';

export type ProductProcess = {
  isProductDataLoaded: boolean;
  isPromoDataLoaded: boolean;
  products: ProductType[];
  promo: PromoType;
}

export type UiProcess = {
  showMessage: boolean;
  message: MessageType;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
