import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useEventListener } from '../../../hooks/useEventListener';
import { basketProductRemover, removeProductToggler } from '../../../store/basket-process/basket-process';
import { getProductId } from '../../../store/basket-process/selectors';
import { getAllProducts } from '../../../store/filters-process/selectors';
import BasketItem from '../../basket-item/basket-item';

function ModalRemoveItem() {

  const dispatch = useAppDispatch();
  const id = useAppSelector(getProductId);
  const products = useAppSelector(getAllProducts);
  const [basketProduct] = products.filter((product) => product.id === Number(id));

  const handleToggleModalClick = () => {
    (dispatch(removeProductToggler()));
  };

  useEventListener(removeProductToggler);

  return (
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div className="modal__overlay" data-testid='overlay-test' onClick={handleToggleModalClick}></div>
        <div className="modal__content">
          <p className="title title--h4">Удалить этот товар?</p>
          <BasketItem camera={basketProduct}/>
          <div className="modal__buttons">
            <button className="btn btn--purple modal__btn modal__btn--half-width" data-testid='remove-button-test' id='remove-item' type="button" autoFocus onClick={
              ()=> {dispatch(basketProductRemover(basketProduct.id));
                dispatch(removeProductToggler());}
            }
            >Удалить
            </button>
            <Link to="#"className="btn btn--transparent modal__btn modal__btn--half-width" data-testid='continue-purchases-test' onClick={handleToggleModalClick}>Продолжить покупки
            </Link>
          </div>
          <button className="cross-btn" type="button" data-testid='cross-btn-test' aria-label="Закрыть попап" onClick={handleToggleModalClick} onBlur={()=>{document.getElementById('remove-item')?.focus();}}>
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalRemoveItem;
