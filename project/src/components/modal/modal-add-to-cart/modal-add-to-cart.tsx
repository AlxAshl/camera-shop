import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useEventListener } from '../../../hooks/useEventListener';
import { cartToggler } from '../../../store/utils-process/utils-process';


function ModalAddToCart (): JSX.Element {
  const dispatch = useAppDispatch();
  useEventListener(cartToggler);
  const handleToggleModalClick = () => {
    dispatch(cartToggler());
  };

  return (
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content">
          <p className="title title--h4">Добавить товар в корзину</p>
          <div className="basket-item basket-item--short">
            <div className="basket-item__img">
              <picture>
                <source type="image/webp" srcSet="img/content/img9.webp, img/content/img9@2x.webp 2x"/>
                <img src="img/content/img9.jpg" srcSet="img/content/img9@2x.jpg 2x" width="140" height="120" alt="Фотоаппарат «Орлёнок»"/>
              </picture>
            </div>
            <div className="basket-item__description">
              <p className="basket-item__title">Фотоаппарат «Орлёнок»</p>
              <ul className="basket-item__list">
                <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">O78DFGSD832</span>
                </li>
                <li className="basket-item__list-item">Плёночная фотокамера</li>
                <li className="basket-item__list-item">Любительский уровень</li>
              </ul>
              <p className="basket-item__price"><span className="visually-hidden">Цена:</span>18 970 ₽</p>
            </div>
          </div>
          <div className="modal__buttons">
            <button data-testid='cart-button-test' className="btn btn--purple modal__btn modal__btn--fit-width" type="button" onClick={handleToggleModalClick}>
              <svg width="24" height="16" aria-hidden="true">
                <use xlinkHref="#icon-add-basket"></use>
              </svg>Добавить в корзину
            </button>
          </div>
          <button data-testid='cross-btn-test' className="cross-btn" type="button" aria-label="Закрыть попап" onClick={handleToggleModalClick}>
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
export default ModalAddToCart;
