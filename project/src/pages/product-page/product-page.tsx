import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Reviews from '../../components/reviews/reviews';
import SelectedProduct from '../../components/selected-product/selected-product';
import Similar from '../../components/similar/similar';
import SVGRoot from '../../components/svg-root/svg-root';
import UpButton from '../../components/up-button/up-button';

function ProductPage(): JSX.Element {
  return(
    <>
      <SVGRoot />
      <div className="wrapper">
        <Header/>
        <main>
          <div className="page-content">
            <Breadcrumbs/>
            <SelectedProduct/>
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
