import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AppRoute } from '../../const';
import Basket from '../../pages/basket/basket';
import MainPage from '../../pages/main-page/main-page';
import NotFound from '../../pages/not-found/not-found';
import ProductPage from '../../pages/product-page/product-page';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path = {AppRoute.Root}
          element = {<MainPage/>}
        />
        <Route
          path = {`${AppRoute.Product}/:id`}
          element = {<ProductPage/>}
        />
        <Route
          path = {AppRoute.Basket}
          element = {<Basket/>}
        />
        <Route
          path = {AppRoute.Notfound}
          element = {<NotFound/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// return <p>Hello, world!</p>;
