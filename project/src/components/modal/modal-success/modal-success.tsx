
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useEventListener } from '../../../hooks/useEventListener';
import { succesToggler } from '../../../store/utils-process/utils-process';

type ModalSuccessProps = {
  isSuccessActive: boolean;
}

function ModalSuccess ({isSuccessActive}: ModalSuccessProps): JSX.Element {

  const dispatch = useAppDispatch();
  const handleReturnToPurchacesButtonClick = () => {
    dispatch(succesToggler());
  };

  useEventListener(succesToggler);

  return (
    <div className="modal is-active modal--narrow">
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content">
          <p className="title title--h4">Спасибо за отзыв</p>
          <svg className="modal__icon" width="80" height="78" aria-hidden="true">
            <use xlinkHref="#icon-review-success"></use>
          </svg>
          <div className="modal__buttons">
            <button data-testid='success-button-test' className="btn btn--purple modal__btn modal__btn--fit-width" id="success-button" type="button" onClick={handleReturnToPurchacesButtonClick} autoFocus>Вернуться к покупкам
            </button>
          </div>
          <button data-testid='cross-btn-test' className="cross-btn" type="button" aria-label="Закрыть попап" onClick={handleReturnToPurchacesButtonClick} onBlur={()=>{document.getElementById('success-button')?.focus();}}>
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalSuccess;
