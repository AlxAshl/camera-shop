import { useEffect } from 'react';
import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Catalog from '../../components/catalog/catalog';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import SVGRoot from '../../components/svg-root/svg-root';
import Message from '../../components/ui/message';
import { useAppSelector } from '../../hooks';
import { store } from '../../store';
import { getMessageContent, getMessageVisibilityStatus } from '../../store/ui-process/selectors';
import { toggleMessage } from '../../store/ui-process/ui-process';


function MainPage(): JSX.Element {

  const message = useAppSelector(getMessageContent);
  const isVisible = useAppSelector(getMessageVisibilityStatus);

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        store.dispatch(toggleMessage());
      }, 3000);
    }
  },[isVisible]);

  return (
    <>
      <SVGRoot />
      <div className="wrapper">
        <Header />
        <main>
          <Banner />
          {isVisible && <Message props={message}/>}
          <div className="page-content">
            <Breadcrumbs />
            <Catalog />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
export default MainPage;
