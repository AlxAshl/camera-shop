import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';
import Preloader from '../preloader/preloader';
import ProductPage from '../../pages/product-page/product-page';
import NotFound from '../../pages/not-found/not-found';
import Basket from '../../pages/basket/basket';
import Catalog from '../catalog/catalog';
import { AppRoute } from '../../const';
import MainPage from '../../pages/main-page/main-page';
import Root from '../../pages/root/root';
import { store } from '../../store/store';
import { fetchSearchSuggestionsAction } from '../../store/api-actions';
import { useEffect } from 'react';


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
      {([AppRoute.NotFoundPage, AppRoute.NotMatched]).map((path) => <Route key={path.length} path={path} element={<NotFound />} />)}
    </Route>
  )
);

function App(): JSX.Element {
  useEffect(()=>{
    store.dispatch(fetchSearchSuggestionsAction());
  },[]);
  return (
    <RouterProvider router={router}
      fallbackElement = {<Preloader/>}
    />
  );
}

export default App;


