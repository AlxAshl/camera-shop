import { useEffect } from 'react';
import { /*Routes, Route, BrowserRouter, */RouterProvider } from 'react-router-dom';
// import { AppRoute } from '../../const';
// import Basket from '../../pages/basket/basket';
// import MainPage from '../../pages/main-page/main-page';
// import NotFound from '../../pages/not-found/not-found';
// import ProductPage from '../../pages/product-page/product-page';
import { store } from '../../store';
import { fetchPromoAction } from '../../store/api-actions';
import router from '../browser-router/browser-router';

let isInitial = true;


function App(): JSX.Element {

  useEffect(()=> {
    if(isInitial){
      store.dispatch(fetchPromoAction());
      isInitial = false;
    }
  },[]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
