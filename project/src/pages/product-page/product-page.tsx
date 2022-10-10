import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Reviews from '../../components/reviews/reviews';
import SelectedProduct from '../../components/selected-product/selected-product';
import Similar from '../../components/similar/similar';
import SVGRoot from '../../components/svg-root/svg-root';
import UpButton from '../../components/up-button/up-button';
import { getNumeric } from '../../components/utils/pages';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchProductAction } from '../../store/api-actions';
import { getLoadedProductStatus, getProduct } from '../../store/product-process/selectors';

function ProductPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const product = useAppSelector(getProduct);
  const isProductLoaded = useSelector(getLoadedProductStatus);
  useEffect(()=>{
    const id = getNumeric(location.pathname);
    dispatch(fetchProductAction(Number(id)));
  },[location, dispatch]);

  return(
    <>
      <SVGRoot />
      <div className="wrapper">
        <Header/>
        <main>
          <div className="page-content">
            <Breadcrumbs camera={product}/>
            {isProductLoaded && <SelectedProduct camera={product}/>}
            <Similar/>
            <Reviews/>
          </div>
        </main>
        <UpButton/>
        <Footer/>
      </div>
    </>
  );
}

export default ProductPage;
