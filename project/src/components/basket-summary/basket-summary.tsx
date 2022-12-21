import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { ValidCoupons } from '../../const';
import { useCountSum } from '../../hooks/use-count-sum';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { postCouponAction, postOrderAction } from '../../store/api-actions';
import { getBasketProducts, getDiscount } from '../../store/basket-process/selectors';
import { seperatePrice } from '../utils/seperate-price';


function BasketSummary(): JSX.Element {

  const dispatch = useAppDispatch();
  const discount = useAppSelector(getDiscount);
  const basketProducts = useAppSelector(getBasketProducts);
  const [discountValue, setDiscountValue] = useState(0);
  const totalSum = useCountSum(basketProducts, discountValue);
  const [couponValidity, setCouponValidity] = useState('');
  const [couponData, setCouponData] = useState({
    coupon: '',
  });
  const [orderData, setOrderData] = useState({
    camerasIds: [] as number[],
    coupon: null as null | string
  });

  useEffect(()=>{
    setDiscountValue(discount);
  },[discount]);

  useEffect(()=>{
    const productIds = [] as number[];
    basketProducts.forEach((product) => productIds.push(Number(product.id)));
    setOrderData({...orderData, camerasIds: productIds});
  },[basketProducts]);

  const handleCouponInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const {value} = evt.target;
    setCouponData({coupon: value});
    setCouponValidity('');
  };

  const handleCouponSubmitClick = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (ValidCoupons.includes(couponData.coupon)) {
      dispatch(postCouponAction(couponData));
      setCouponValidity('is-valid');
      setOrderData({...orderData, coupon: couponData.coupon});
    }
    else {
      setCouponValidity('is-invalid');
      setCouponData({coupon: ''});
    }
  };

  const handleFormSubmitClick = () => {
    dispatch(postOrderAction(orderData));
  };

  return (
    <div className="basket__summary">
      <div className="basket__promo">
        <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
        <div className="basket-form">
          <form method="post" onSubmit={handleCouponSubmitClick}>
            <div className={`custom-input ${couponValidity}`} data-testid='input-class-test'>
              <label><span className="custom-input__label">Промокод</span>
                <input type="text" name="promo" placeholder="Введите промокод" data-testid='coupon-field-test' onChange={handleCouponInputChange}/>
              </label>
              <p className="custom-input__error">Промокод неверный</p>
              <p className="custom-input__success">Промокод принят!</p>
            </div>
            <button className="btn" type="submit" data-testid ='send-coupon-test'>Применить
            </button>
          </form>
        </div>
      </div>
      <div className="basket__summary-order">
        <p className="basket__summary-item"><span className="basket__summary-text">Всего:</span><span className="basket__summary-value" data-testid='sum-test'>{seperatePrice(totalSum.sum)} ₽</span></p>
        <p className="basket__summary-item"><span className="basket__summary-text">Скидка:</span><span className={totalSum.discountSum > 0 ? 'basket__summary-value--bonus' : 'basket__summary-value' } data-testid='discount-test'>{seperatePrice(totalSum.discountSum)} ₽</span></p>
        <p className="basket__summary-item"><span className="basket__summary-text basket__summary-text--total">К оплате:</span><span className="basket__summary-value basket__summary-value--total" data-testid='sumdiscounted-test'>{totalSum.discountSum > 0 ? seperatePrice(totalSum.discountedTotalSum) : seperatePrice(totalSum.sum)} ₽</span></p>
        <button className="btn btn--purple" type="submit" onClick={handleFormSubmitClick}>Оформить заказ</button>
      </div>
    </div>
  );
}

export default BasketSummary;

