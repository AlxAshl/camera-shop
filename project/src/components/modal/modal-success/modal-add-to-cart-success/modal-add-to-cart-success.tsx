import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../../../const';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { useEventListener } from '../../../../hooks/useEventListener';
import { succesCartToggler } from '../../../../store/basket-process/basket-process';


function ModalAddToCartSuccess (): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEventListener(succesCartToggler);

  const handleReturnToPurchacesButtonClick = () => {
    dispatch(succesCartToggler());
  };
  const handleRedirectToBasketButtonClick = () => {
    dispatch(succesCartToggler());
    navigate(AppRoute.Basket);
  };

  return (
    <div className="modal is-active modal--narrow">
      <div className="modal__wrapper">
        <div className="modal__overlay" data-testid='overlay-test' onClick={handleReturnToPurchacesButtonClick}></div>
        <div className="modal__content">
          <p className="title title--h4">Товар успешно добавлен в корзину</p>
          <svg className="modal__icon" width="86" height="80" aria-hidden="true">
            <use xlinkHref="#icon-success"></use>
          </svg>
          <div className="modal__buttons">
            <button className="btn btn--transparent modal__btn" id='continue-purchases' data-testid='continue-purchases-test' onClick={handleReturnToPurchacesButtonClick} autoFocus>Продолжить покупки</button>
            <button className="btn btn--purple modal__btn modal__btn--fit-width" data-testid='go-to-basket-test' onClick={handleRedirectToBasketButtonClick} >Перейти в корзину
            </button>
          </div>
          <button className="cross-btn" type="button" data-testid='cross-btn-test' aria-label="Закрыть попап" onClick={handleReturnToPurchacesButtonClick} onBlur={()=>{document.getElementById('continue-purchases')?.focus();}}>
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalAddToCartSuccess;
