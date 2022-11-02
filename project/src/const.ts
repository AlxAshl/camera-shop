export enum AppRoute {
  Root = '/',
  Catalog ='/catalog',
  Page = '/:page_id',
  Product = '/cameras',
  Basket = '/basket',
  NotFoundPage = '/404',
  NotMatched = '*'
}
export const BreadcrumbsSpecs = {
  Root: {
    title: 'Главная',
    path: AppRoute.Root,
  },
  Catalog: {
    title: 'Каталог',
    path: AppRoute.Catalog,
  },
  Cameras: {
    title: 'Каталог',
    path: AppRoute.Product,
  },
  Basket: {
    title: 'Корзина',
    path: AppRoute.Basket
  },
};

export enum NameSpace {
  Product = 'PRODUCT',
  Review = 'REVIEW',
  Complementary = 'COMPLEMENTARY',
  Utils = 'UTILS',
}

export enum APIRoute {
  Products = '/cameras',
  Promo = '/promo',
  Reviews='/reviews',
}

export const BACKEND_URL = 'https://camera-shop.accelerator.pages.academy';
export const REQUEST_TIMEOUT = 5000;
export const PAGE_LIMIT = 9;
export const RATING_STARS_COUNT = 5;
