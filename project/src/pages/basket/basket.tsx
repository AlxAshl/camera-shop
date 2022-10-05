import BasketList from '../../components/basket-list/basket-list';
import BasketSummary from '../../components/basket-summary/basket-summary';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import SVGRoot from '../../components/svg-root/svg-root';

function Basket(): JSX.Element {

  return (
    <>
      <SVGRoot/>
      <div className="wrapper">
        <Header/>
        <main>
          <div className="page-content">
            <Breadcrumbs/>
            <section className="basket">
              <div className="container">
                <h1 className="title title--h2">Корзина</h1>
                <BasketList/>
                <BasketSummary/>
              </div>
            </section>
          </div>
        </main>
        <Footer/>
      </div>
    </>
  );
}

export default Basket;
