import { Link } from 'react-router-dom';
import { ProductType } from '../../types/product';

type ProductCardProps = {
  product: ProductType;
}

function ProductCard({product}: ProductCardProps): JSX.Element {
  const {rating, reviewCount, name, price, id} = product;

  return (
    <div className="product-card">
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`img/content/img${id}.webp, img/content/img${id}@2x.webp 2x`}/>
          <img src={`img/content/img${id}.jpg`} srcSet={`img/content/img${id}@2x.jpg 2x`} width="280" height="240" alt="Ретрокамера «Das Auge IV»"/>
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <svg width="17" height="16" aria-hidden="false">
            <use xlinkHref={rating >= 1
              ? '#icon-full-star'
              : '#icon-star'}
            >
            </use>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref={rating >= 2
              ? '#icon-full-star'
              : '#icon-star'}
            >
            </use>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref={rating >= 3
              ? '#icon-full-star'
              : '#icon-star'}
            >
            </use>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref={rating >= 4
              ? '#icon-full-star'
              : '#icon-star'}
            >
            </use>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref={rating >= 5
              ? '#icon-full-star'
              : '#icon-star'}
            >
            </use>
          </svg>
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
        <Link to="#" className="btn btn--transparent" >Подробнее
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
