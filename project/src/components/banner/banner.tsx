import { Link } from 'react-router-dom';
import { PromoType } from '../../types/product';

type BannerProps = {
  promo: PromoType;
}

function Banner({promo}: BannerProps): JSX.Element {
  const {id, name} = promo;

  return (
    <div className="banner">
      <picture>
        <source type="image/webp" srcSet="img/content/banner-bg.webp, img/content/banner-bg@2x.webp 2x"/>
        <img src="img/content/banner-bg.jpg" srcSet="img/content/banner-bg@2x.jpg 2x" width="1280" height="280" alt="баннер"/>
      </picture>
      <p className="banner__info">
        <span className="banner__message">Новинка!</span>
        <span className="title title--h1">{name}</span>
        <span className="banner__text">Профессиональная камера от&nbsp;известного производителя</span>
        <Link className="btn" to={`/cameras/${id}`}>Подробнее</Link>
      </p>
    </div>
  );
}

export default Banner;
