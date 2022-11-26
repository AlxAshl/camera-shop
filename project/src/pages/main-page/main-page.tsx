import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import { getPagesCount } from '../../components/utils/pages';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { fetchPromoAction } from '../../store/api-actions';
import { getLoadedPromoStatus, getPromo } from '../../store/complementary-process/selectors';
import { getProductCount } from '../../store/product-process/selectors';
import { getPage } from '../../store/utils-process/selectors';
import { pageSetter, paramsSetter } from '../../store/utils-process/utils-process';


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
      dispatch(pageSetter(1));
      dispatch(paramsSetter(passedParams));
      navigate(`${AppRoute.Catalog}/page_1`);
    }
    if(!location.pathname.includes('/page_')) {
      navigate(`${AppRoute.NotFoundPage}`);
    }
    if(location.pathname === (`${AppRoute.Catalog}`)) {
      navigate(`${AppRoute.Catalog}/page_1`);
      dispatch(pageSetter(1));
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
