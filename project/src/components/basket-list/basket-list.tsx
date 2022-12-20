import { useAppSelector } from '../../hooks/useAppSelector';
import { getBasketProducts } from '../../store/basket-process/selectors';
import BasketProduct from './basket-product/basket-product';

function BasketList(): JSX.Element {
  const basketProducts = useAppSelector(getBasketProducts);
  return (
    <ul className="basket__list">
      {basketProducts.map((product) => (
        <li className="basket-item" key={`${product.id} - product`}>
          <BasketProduct basketProduct={product}/>
        </li>
      ))}
    </ul>
  );
}

export default BasketList;

