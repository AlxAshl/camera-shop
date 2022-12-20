import { MutableRefObject, useEffect, useRef, useState } from 'react';
import useQuantityInputEventListener from '../../../hooks/use-quantity-input-event-listener';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { basketProductCounter, basketProductSetter, productSelector, removeProductToggler } from '../../../store/basket-process/basket-process';
import { BasketProductType } from '../../../types/product';
import { seperatePrice } from '../../utils/seperate-price';

type BasketProductComponentType = {
  basketProduct: BasketProductType;
}
function BasketProduct({basketProduct}: BasketProductComponentType) {

  const dispatch = useAppDispatch();
  const {id, previewImgWebp, previewImgWebp2x, previewImg, previewImg2x, category, quantity, level, price, vendorCode, name} = basketProduct;
  const [count, setCount] = useState(quantity);
  const quantityInputRef = useRef() as MutableRefObject<HTMLInputElement>;
  const quantityInputValue = useQuantityInputEventListener(quantityInputRef, basketProductSetter, id);

  useEffect(()=>{
    setCount(quantity);
  },[quantity]);

  useEffect(()=>{
    if(quantityInputValue){
      Number(quantityInputValue) > 99
        ? dispatch(basketProductSetter({quantity:99, id: id}))
        : dispatch(basketProductSetter({quantity: Number(quantityInputValue), id: id}));
    }
  },[quantityInputValue, dispatch, id]);

  return (
    <>
      <div className="basket-item__img">
        <picture>
          <source type="image/webp" srcSet={`${previewImgWebp}, ${previewImgWebp2x}`} />
          <img src={previewImg} srcSet={previewImg2x} width="140" height="120" alt="Фотоаппарат «Орлёнок»" />
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
      </div>
      <p className="basket-item__price">
        <span className="visually-hidden">Цена:</span>{seperatePrice(price)} ₽
      </p>
      <div className="quantity">
        <button className="btn-icon btn-icon--prev" disabled={quantity <= 1} data-testid='button-decrease-test' aria-label="уменьшить количество товара" onClick={() => { dispatch(basketProductCounter({ ...basketProduct, quantity: -1 })); } }>
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
        <label className="visually-hidden" htmlFor="counter1"></label>
        <input ref={quantityInputRef} data-testid='count-input-test' type="number" id="counter1" value={count} min="1" max="99" aria-label="количество товара" onChange={(evt) => setCount(Number(evt.target.value))} />
        <button className="btn-icon btn-icon--next" disabled={quantity >= 99} data-testid='button-increase-test' aria-label="увеличить количество товара" onClick={() => { dispatch(basketProductCounter({ ...basketProduct, quantity: 1 })); } }>
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price">
        <span className="visually-hidden">Общая цена:</span>{seperatePrice(price * quantity)} ₽
      </div>
      <button className="cross-btn" data-testid='remove-item-button-test' type="button" aria-label="Удалить товар" onClick={() => {
        dispatch(productSelector(String(id)));
        dispatch(removeProductToggler());
      }}
      >
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </>
  );
}

export default BasketProduct;
