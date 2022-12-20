import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import ModalAddToCart from '../../components/modal/modal-add-to-cart/modal-add-to-cart';
import ModalAddToCartSuccess from '../../components/modal/modal-success/modal-add-to-cart-success/modal-add-to-cart-success';
import { getPagesCount } from '../../components/utils/pages';
import { AppRoute, DEFAULT_PAGE_NUMBER } from '../../const';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { fetchPromoAction } from '../../store/api-actions';
import { getModalCartStatus, getModalCartSuccessStatus } from '../../store/basket-process/selectors';
import { getLoadedPromoStatus, getPromo } from '../../store/complementary-process/selectors';
import { pageUpdateSetter } from '../../store/filters-process/filters-process';
import { getProductCount } from '../../store/product-process/selectors';
import { getPage } from '../../store/utils-process/selectors';
import { pageSetter } from '../../store/utils-process/utils-process';


function MainPage(): JSX.Element {

  const bannerData = useAppSelector(getPromo);
  const bannerLoaded = useAppSelector(getLoadedPromoStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const productCount = useAppSelector(getProductCount);
  const totalPages = getPagesCount(productCount);
  const location = useLocation();
  const currentPage = useAppSelector(getPage);
  const [searchParams] = useSearchParams();
  const [initialLoad, setInitialLoad] = useState(true);
  const isSuccessActive = useAppSelector(getModalCartSuccessStatus);
  const isCartActive = useAppSelector(getModalCartStatus);

  useEffect(()=>{
    const passedParams = searchParams.toString();
    if((productCount !== 0 && currentPage > totalPages) && typeof passedParams === 'string') {
      dispatch(pageSetter(DEFAULT_PAGE_NUMBER));
      dispatch(pageUpdateSetter(true));
      navigate(`${AppRoute.Catalog}/page_${DEFAULT_PAGE_NUMBER}`);
    }
    if(!location.pathname.includes('/page_')) {
      navigate(`${AppRoute.NotFoundPage}`);
    }
    if(location.pathname === (`${AppRoute.Catalog}`)) {
      navigate(`${AppRoute.Catalog}/page_${DEFAULT_PAGE_NUMBER}`);
      dispatch(pageSetter(DEFAULT_PAGE_NUMBER));
    }
  },[currentPage, dispatch, navigate, productCount, totalPages, location.pathname]);

  useEffect(()=>{
    initialLoad
      ? setInitialLoad(false)
      : dispatch(fetchPromoAction());
  },[dispatch, initialLoad]);

  return (
    <main {...isCartActive || isSuccessActive
      ? { style:{paddingRight: '17px'}}
      : ''}
    >
      {bannerLoaded
        ? <Banner promo={bannerData}/>
        : ''}
      <div className="page-content">
        <Breadcrumbs />
        <Outlet />
        {isCartActive
          ? <ModalAddToCart/>
          : ''}
        {isSuccessActive
          ? <ModalAddToCartSuccess/>
          : ''}
      </div>
    </main>
  );
}
export default MainPage;
