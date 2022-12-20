import { store } from '../store/store';
import { MessageType } from './message';
import { BasketProductType, ProductType, PromoType } from './product';
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
  showErrorMessage: boolean;
  message: MessageType;
  currentPage: number;
}

export type BasketProcess = {
  showCart: boolean;
  showCartSuccess: boolean;
  showRemoveProduct: boolean;
  showBasketSuccess: boolean;
  productId: string;
  basketProducts: BasketProductType[];
  totalQuantity: number;
  couponDiscount: number;
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
  showReview: boolean;
  showReviewSuccess: boolean;
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
