import { Link } from 'react-router-dom';
import { ProductType } from '../../types/product';

type ProductCardProps = {
  product: ProductType;
  isSimilar? : boolean;
}

function ProductCard({product, isSimilar}: ProductCardProps): JSX.Element {
  const {rating, reviewCount, name, price, id, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x} = product;
  const starsRating = [];

  for (let i = 1; i < 6; i++) {
    starsRating.push(
      <svg key = {`${product.id}-${i}`} width="17" height="16" aria-hidden="false">
        <use xlinkHref={rating >= i
          ? '#icon-full-star'
          : '#icon-star'}
        >
        </use>
      </svg>);
  }

  return (
    <div className={isSimilar
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
          {starsRating}
          <p className="visually-hidden">Рейтинг: {rating}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewCount}</p>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button className="btn btn--purple product-card__btn" type="button">Купить
        </button>
        <Link to={`/cameras/${id}`} className="btn btn--transparent">Подробнее
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
