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
  PriceMin: string[];
  PriceMax: string[];
  Sort: string[];
  Order: string[];
  Search: string[];
  Level: string[];
  Category: string[];
  Type: string[];
};
export type FiltersProcess = {
  pageUpdate: boolean;
  allProducts: ProductType[];
  extraFilters: {
    PriceMin: string[];
    PriceMax: string[];
    Sort: string[];
    Order: string[];
    Search: string[];
    Level: string[];
    Category: string[];
    Type: string[];
  };
}

export type ReviewProcess = {
  isReviewsDataLoaded: boolean;
  reviews: ReviewType[];
  isReviewPosted: boolean;
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
