import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import { getPagesCount } from '../../components/utils/pages';
import { AppRoute, DEFAULT_PAGE_NUMBER } from '../../const';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { fetchPromoAction } from '../../store/api-actions';
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
    dispatch(fetchPromoAction());
  },[dispatch]);

  return (
    <main>
      {bannerLoaded
        ? <Banner promo={bannerData}/>
        : ''}
      <div className="page-content">
        <Breadcrumbs />
        <Outlet />
      </div>
    </main>
  );
}
export default MainPage;
