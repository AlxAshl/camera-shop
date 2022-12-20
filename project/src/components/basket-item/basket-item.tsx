import { ProductType } from '../../types/product';
import { seperatePrice } from '../utils/seperate-price';

interface BasketProps {
    camera: ProductType;
  }
function BasketItem({camera}: BasketProps) {
  const {name, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, price, level, category, vendorCode} = camera;
  return (
    <div className="basket-item basket-item--short">
      <div className="basket-item__img">
        <picture>
          <source type="image/webp" srcSet={`${previewImgWebp}, ${previewImgWebp2x}`}/>
          <img src={previewImg} srcSet={previewImg2x} width="140" height="120" alt="Фотоаппарат «Орлёнок»"/>
        </picture>
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">{name}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{vendorCode}</span>
          </li>
          <li className="basket-item__list-item">{category}</li>
          <li className="basket-item__list-item">{level} уровень</li>
        </ul>
        <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{seperatePrice(price)} ₽</p>
      </div>
    </div>
  );
}

export default BasketItem;
