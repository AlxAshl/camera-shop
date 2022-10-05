import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Catalog from '../../components/catalog/catalog';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import SVGRoot from '../../components/svg-root/svg-root';

function MainPage(): JSX.Element {
  return (
    <>
      <SVGRoot />
      <div className="wrapper">
        <Header />
        <main>
          <Banner />
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
