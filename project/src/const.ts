export enum AppRoute {
  Root = '/catalog',
  Product = '/cameras/:id',
  Basket = '/basket',
  Notfound = '*',
  Pages = '/:page_id'
}

export enum NameSpace {
  Product = 'PRODUCT',
  Review = 'REVIEW',
  Ui = 'UI',
}

export enum APIRoute {
  Products = '/cameras',
  Promo = '/promo'
}

export const BACKEND_URL = 'https://camera-shop.accelerator.pages.academy';
export const REQUEST_TIMEOUT = 5000;
export const PAGE_LIMIT = 9;
