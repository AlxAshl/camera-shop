import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../../../const';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { useEventListener } from '../../../../hooks/useEventListener';
import { succesBasketToggler } from '../../../../store/basket-process/basket-process';


function ModalBasketSuccess() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEventListener(succesBasketToggler);

  const handleOverlayClick = () => {
    dispatch(succesBasketToggler());
  };
  const handleReturnToPurchasesButtonClick = () => {
    dispatch(succesBasketToggler());
    navigate(AppRoute.Catalog);
  };

  return(
    <div className="modal is-active modal--narrow">
      <div className="modal__wrapper">
        <div className="modal__overlay" data-testid='overlay-test' onClick={handleOverlayClick}></div>
        <div className="modal__content">
          <p className="title title--h4">Спасибо за покупку</p>
          <svg className="modal__icon" width="80" height="78" aria-hidden="true">
            <use xlinkHref="#icon-review-success"></use>
          </svg>
          <div className="modal__buttons">
            <button className="btn btn--purple modal__btn modal__btn--fit-width" data-testid='continue-purchases-test' type="button" id='continue-purchases' onClick={handleReturnToPurchasesButtonClick} autoFocus>Вернуться к покупкам
            </button>
          </div>
          <button className="cross-btn" data-testid='cross-btn-test' type="button" aria-label="Закрыть попап" onClick={handleOverlayClick} onBlur={()=>{document.getElementById('continue-purchases')?.focus();}}>
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalBasketSuccess;
