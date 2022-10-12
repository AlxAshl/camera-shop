import {
  createBrowserRouter,
} from 'react-router-dom';
import { AppRoute } from '../../const';
import Basket from '../../pages/basket/basket';
import MainPage from '../../pages/main-page/main-page';
import NotFound from '../../pages/not-found/not-found';
import ProductPage from '../../pages/product-page/product-page';
import Catalog from '../catalog/catalog';

const router = createBrowserRouter(
  [
    {
      path: AppRoute.Root,
      element: <MainPage/>,
      children: [{
        path: '/catalog/:page_id',
        element: <Catalog/>
      }]
    },
    {
      path: AppRoute.Basket,
      element: <Basket/>
    },
    {
      path: AppRoute.Product,
      element: <ProductPage/>
    },
    {
      path: AppRoute.Notfound,
      element: <NotFound/>
    },
  ]);

export default router;

