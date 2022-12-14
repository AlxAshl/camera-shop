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
  Filters = 'FILTERS',
  Basket = 'BASKET',
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
export const DEFAULT_PAGE_NUMBER = 1;

export const SortOrder = {
  Asc: 'asc',
  Desc: 'desc',
};

export const SortType = {
  Price: 'price',
  Rating: 'rating',
};

export const URLParams = {
  Search: 'name_like',
  Sort: '_sort',
  Order: '_order',
  Minprice: 'price_gte',
  Maxprice: 'price_lte',
  Category: 'category',
  Level: 'level',
  Type: 'type',
};

export const TypeFilter = {
  Digital: 'Цифровая',
  Film: 'Плёночная',
  Instant: 'Моментальная',
  Collectible: 'Коллекционная'
};

export const CategoryFilter = {
  Camera: 'Фотоаппарат',
  Video: 'Видеокамера'
};

export const LevelFilter = {
  Novice: 'Нулевой',
  Amateur: 'Любительский',
  Pro: 'Профессиональный'
};

export const ValidCoupons = ['camera-333','camera-444','camera-555'];
