import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks';
import { toggleSuccess } from '../../store/utils-process/utils-process';

type ModalSuccessProps = {
  isActive: boolean;
}

function ModalSuccess ({isActive}: ModalSuccessProps): JSX.Element {

  const dispatch = useAppDispatch();
  const handleReturnToPurchacesButtonClick = () => {
    dispatch(toggleSuccess());
  };

  useEffect(() => {
    const isEscapeKey = (evt:KeyboardEvent) => evt.key === 'Escape';
    const handleEscKeyPress = (evt: KeyboardEvent) => {
      if(isEscapeKey(evt)) {
        dispatch(toggleSuccess());
      }
    };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleEscKeyPress);
    return () => {
      document.body.style.overflow = 'visible';
      document.removeEventListener('keydown', handleEscKeyPress);
    };
  },[dispatch]);

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
            <button className="btn btn--purple modal__btn modal__btn--fit-width" id="success-button" type="button" onClick={handleReturnToPurchacesButtonClick} autoFocus>Вернуться к покупкам
            </button>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={handleReturnToPurchacesButtonClick} onBlur={()=>{document.getElementById('success-button')?.focus();}}>
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
