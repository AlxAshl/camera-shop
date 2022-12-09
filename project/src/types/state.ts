import { store } from '../store/store';
import { MessageType } from './message';
import { ProductType, PromoType } from './product';
import { ReviewType } from './review';

export type ProductProcess = {
  isProductsDataLoaded: boolean;
  isProductDataLoaded: boolean;
  productCount: number;
  products: ProductType[];
  similarProducts: ProductType[];
  product: ProductType;
}
export type ComplementaryProcess = {
  isPromoDataLoaded: boolean;
  promo: PromoType;
}
export type UtilsProcess = {
  showMessage: boolean;
  showReview: boolean;
  showSuccess: boolean;
  showCart: boolean;
  message: MessageType;
  currentPage: number;
}

export type ExtraFilters = {
  minprice: string[];
  maxprice: string[];
  sort: string[];
  order: string[];
  search: string[];
  level: string[];
  category: string[];
  type: string[];
};
export type FiltersProcess = {
  pageUpdate: boolean;
  allProducts: ProductType[];
  filteredProducts: ProductType[];
  extraFilters: {
    minprice: string[];
    maxprice: string[];
    level: string[];
    category: string[];
    type: string[];
    sort: string[];
    order: string[];
    search: string[];
  };
}

export type ReviewProcess = {
  isReviewsDataLoaded: boolean;
  reviews: ReviewType[];
  isReviewPosted: boolean;
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
