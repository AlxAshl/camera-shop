import BasketProduct from '../../components/basket-product/basket-product/basket-product';
import BasketSummary from '../../components/basket-summary/basket-summary';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import ModalRemoveItem from '../../components/modal/modal-remove/modal-remove-item';
import ModalBasketSuccess from '../../components/modal/modal-success/modal-basket-success.tsx/modal-basket-success';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getBasketProducts, getModalBasketSuccessStatus, getModalRemoveProductStatus } from '../../store/basket-process/selectors';

function Basket(): JSX.Element {
  const isProductRemoveActive = useAppSelector(getModalRemoveProductStatus);
  const isSuccessVisible = useAppSelector(getModalBasketSuccessStatus);
  const basketProducts = useAppSelector(getBasketProducts);
  return (
    <main>
      <div className="page-content">
        <Breadcrumbs/>
        <section className="basket">
          <div className="container">
            <h1 className="title title--h2">Корзина</h1>
            <ul className="basket__list">
              {basketProducts.map((product) => (
                <li className="basket-item" key={`${product.id} - product`}>
                  <BasketProduct basketProduct={product}/>
                </li>
              ))}
            </ul>
            <BasketSummary/>
            {isProductRemoveActive
              ? <ModalRemoveItem/>
              : ''}
            {isSuccessVisible
              ? <ModalBasketSuccess/>
              : ''}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Basket;
