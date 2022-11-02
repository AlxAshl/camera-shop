import { useEffect, useLayoutEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Message from '../../components/ui/message';
import { getNumeric, getPagesCount } from '../../components/utils/pages';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { fetchProductsAction } from '../../store/api-actions';
import { getLoadedPromoStatus, getPromo } from '../../store/complementary-process/selectors';
import { getProductCount } from '../../store/product-process/selectors';
import { getMessageContent, getMessageVisibilityStatus, getPage } from '../../store/utils-process/selectors';
import { messageToggler, pageSetter } from '../../store/utils-process/utils-process';


function MainPage(): JSX.Element {

  const navigate = useNavigate();
  const message = useAppSelector(getMessageContent);
  const isVisible = useAppSelector(getMessageVisibilityStatus);
  const bannerData = useAppSelector(getPromo);
  const bannerLoaded = useAppSelector(getLoadedPromoStatus);
  const currentPage = useAppSelector(getPage);
  const location = useLocation();
  const productCount = useAppSelector(getProductCount);
  const totalPages = getPagesCount(productCount);
  const dispatch = useAppDispatch();
  const [initialLoad, setInitialLoad] = useState(true);

  useLayoutEffect(()=>{
    if((productCount !== 0 && currentPage > totalPages) || !location.pathname.includes('/page_')) {
      navigate(`${AppRoute.NotFoundPage}`);
    }
    if(location.pathname === (`${AppRoute.Catalog}`)) {
      navigate(`${AppRoute.Catalog}/page_1`);
      dispatch(pageSetter(1));
    }
  },[currentPage, dispatch, navigate, productCount, totalPages, location.pathname]);

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        dispatch(messageToggler());
      }, 3000);
    }
  },[isVisible, dispatch]);

  useEffect(() => {
    if(getNumeric(location.pathname) !== currentPage) {
      dispatch(pageSetter(getNumeric(location.pathname)));
    }
  },[currentPage, dispatch, location]);

  useEffect(()=>{
    if(!initialLoad) {
      dispatch(fetchProductsAction(currentPage));
    }
  },[dispatch, currentPage, initialLoad]);

  useEffect(()=>{
    setInitialLoad(false);
  },[]);

  return (
    <main>
      {bannerLoaded
        ? <Banner promo={bannerData}/>
        : ''}
      {isVisible && <Message props={message}/>}
      <div className="page-content">
        <Breadcrumbs />
        <Outlet />
      </div>
    </main>
  );
}
export default MainPage;
