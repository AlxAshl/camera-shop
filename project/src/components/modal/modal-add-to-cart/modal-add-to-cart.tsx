import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useEventListener } from '../../../hooks/useEventListener';
import { basketProductCounter, cartToggler, succesCartToggler } from '../../../store/basket-process/basket-process';
import { getProductId } from '../../../store/basket-process/selectors';
import { getAllProducts } from '../../../store/filters-process/selectors';
import BasketItem from '../../basket-item/basket-item';


function ModalAddToCart (): JSX.Element {
  const dispatch = useAppDispatch();
  const id = useAppSelector(getProductId);
  const products = useAppSelector(getAllProducts);
  const [basketProduct] = products.filter((product) => product.id === Number(id));

  useEventListener(cartToggler);

  const handleToggleModalClick = () => {
    (dispatch(cartToggler()));
  };
  const handleAddButtonClick = () => {
    dispatch(basketProductCounter({...basketProduct, quantity: 1}));
    dispatch(cartToggler());
    dispatch(succesCartToggler());
  };

  return (
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handleToggleModalClick}></div>
        <div className="modal__content">
          <p className="title title--h4">Добавить товар в корзину</p>
          <BasketItem camera={basketProduct}/>
          <div className="modal__buttons">
            <button data-testid='cart-button-test' className="btn btn--purple modal__btn modal__btn--fit-width" id='add-to-cart' type="button" onClick={handleAddButtonClick} autoFocus>
              <svg width="24" height="16" aria-hidden="true">
                <use xlinkHref="#icon-add-basket"></use>
              </svg>Добавить в корзину
            </button>
          </div>
          <button data-testid='cross-btn-test' className="cross-btn" type="button" aria-label="Закрыть попап" onClick={handleToggleModalClick} onBlur={()=>{document.getElementById('add-to-cart')?.focus();}}>
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
