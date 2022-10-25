import { useEffect } from 'react';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';
import { store } from '../../store/store';
import { fetchPromoAction } from '../../store/api-actions';
import Preloader from '../preloader/preloader';
import ProductPage from '../../pages/product-page/product-page';
import NotFound from '../../pages/not-found/not-found';
import Basket from '../../pages/basket/basket';
import Catalog from '../catalog/catalog';
import { AppRoute } from '../../const';
import MainPage from '../../pages/main-page/main-page';
import Root from '../../pages/root/root';


let isInitial = true;

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={AppRoute.Root} element={<Root/>}>
      <Route index element={<Navigate to={`${AppRoute.Catalog}`}/>}/>
      <Route path={`${AppRoute.Catalog}`} errorElement={<NotFound />} element={<MainPage/>} >
        <Route path=":page_id" element={<Catalog/>} errorElement={<NotFound />}/>
      </Route>
      <Route path={AppRoute.Product} element={<ProductPage/>}>
        <Route path =":id" element={<ProductPage/>}/>
      </Route>
      <Route path={AppRoute.Basket} element={<Basket/>}/>
      <Route path={AppRoute.Notfound} element={<NotFound/>}/>
      <Route path={AppRoute.Notfound1} element={<NotFound/>}/>
    </Route>
  )
);

function App(): JSX.Element {

  useEffect(()=> {
    if (isInitial) {
      store.dispatch(fetchPromoAction());
      isInitial = false;
    }
  },[]);

  return (
    <RouterProvider router={router}
      fallbackElement = {<Preloader/>}
    />
  );
}

export default App;


