import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import useProductBasketStatus from '../../hooks/use-product-basket-status';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { cartToggler, productSelector } from '../../store/basket-process/basket-process';
import { getBasketProducts } from '../../store/basket-process/selectors';
import { ProductType } from '../../types/product';
import Rating from '../rating/rating';
import { seperatePrice } from '../utils/seperate-price';

type ProductCardProps = {
  product: ProductType;
  isSimilar? : boolean;
}

function ProductCard({product, isSimilar}: ProductCardProps): JSX.Element {
  const {rating, reviewCount, name, price, id, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x} = product;
  const dispatch = useAppDispatch();
  const basketProducts = useAppSelector(getBasketProducts);
  const inBasket = useProductBasketStatus(basketProducts, id);

  const handleBuyButtonClick = () => {
    dispatch(productSelector(String(id)));
    dispatch(cartToggler());
  };

  return (
    <div data-testid='product-card-test' className={isSimilar
      ? 'product-card is-active'
      : 'product-card'}
    >
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`${previewImgWebp}, ${previewImgWebp2x}`}/>
          <img src={previewImg} srcSet={previewImg2x} width="280" height="240" alt="Ретрокамера «Das Auge IV»"/>
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <Rating id={id} rating={rating} ariaHiddenState={false}/>
          <p data-testid='rating-test' className="visually-hidden">Рейтинг: {rating}</p>
          <p className="rate__count"><span data-testid='rates-total' className="visually-hidden">Всего оценок:</span>{reviewCount}</p>
        </div>
        <p className="product-card__title">{name}</p>
        <p data-testid='price-test'className="product-card__price"><span className="visually-hidden">Цена:</span>{seperatePrice(price)} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        {inBasket
          ?
          <Link to={AppRoute.Basket} className="btn btn--purple-border product-card__btn product-card__btn--in-cart">
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-basket"></use>
            </svg>В корзине
          </Link>
          : <button className="btn btn--purple product-card__btn" type="button" onClick={handleBuyButtonClick}>Купить</button>}
        <Link data-testid='link-test' to={`${AppRoute.Product}/${id}`} className="btn btn--transparent">Подробнее
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
