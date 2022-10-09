import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import SVGRoot from '../../components/svg-root/svg-root';
import Message from '../../components/ui/message';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { store } from '../../store';
import { getLoadedPromoStatus, getPromo } from '../../store/product-process/selectors';
import { getMessageContent, getMessageVisibilityStatus } from '../../store/ui-process/selectors';
import { toggleMessage } from '../../store/ui-process/ui-process';


function MainPage(): JSX.Element {
  const navigate = useNavigate();
  const message = useAppSelector(getMessageContent);
  const isVisible = useAppSelector(getMessageVisibilityStatus);
  const bannerData = useAppSelector(getPromo);
  const bannerLoaded = useAppSelector(getLoadedPromoStatus);
  const location = useLocation();

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        store.dispatch(toggleMessage());
      }, 3000);
    }
    if(location.pathname === AppRoute.Root) {
      navigate(`${AppRoute.Root}/page_1`);
    }
  },[isVisible, location, navigate]);

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
