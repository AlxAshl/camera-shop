import BasketList from '../../components/basket-list/basket-list';
import BasketSummary from '../../components/basket-summary/basket-summary';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';


function Basket(): JSX.Element {
  return (
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
  );
}

export default Basket;
