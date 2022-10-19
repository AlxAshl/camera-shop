import { useEffect, useLayoutEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import SVGRoot from '../../components/svg-root/svg-root';
import Message from '../../components/ui/message';
import { getNumeric, getPagesCount } from '../../components/utils/pages';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCurrentPage } from '../../store/product-process/product-process';
import { getLoadedPromoStatus, getPage, getProductCount, getPromo } from '../../store/product-process/selectors';
import { getMessageContent, getMessageVisibilityStatus } from '../../store/utils-process/selectors';
import { toggleMessage } from '../../store/utils-process/utils-process';


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

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        dispatch(toggleMessage());
      }, 3000);
    }
    if(location.pathname === `${AppRoute.Catalog}${AppRoute.Page}`) {
      navigate(`${AppRoute.Catalog}/page_1`);
    }
    if(getNumeric(location.pathname) !== currentPage) {
      dispatch(setCurrentPage(getNumeric(location.pathname)));
    }
  },[isVisible, location, navigate, dispatch, currentPage]);

  useLayoutEffect(()=>{
    if((productCount !== 0 && currentPage > totalPages) || isNaN(currentPage)) {
      navigate(`/${AppRoute.Notfound}`);
    }
  },[currentPage, navigate, productCount, totalPages]);

  return (
    <>
      <SVGRoot />
      <div className="wrapper">
        <Header />
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
        <Footer />
      </div>

    </>
  );
}
export default MainPage;
