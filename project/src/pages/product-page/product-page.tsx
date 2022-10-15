import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import ModalReview, { ReviewDataType } from '../../components/modal-review/modal-review';
import ReviewsList from '../../components/reviews-list/reviews-list';
import SelectedProduct from '../../components/selected-product/selected-product';
import Similar from '../../components/similar/similar';
import SVGRoot from '../../components/svg-root/svg-root';
import Message from '../../components/ui/message';
import UpButton from '../../components/up-button/up-button';
import { getNumeric } from '../../components/utils/pages';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchProductAction } from '../../store/api-actions';
import { getLoadedProductStatus, getProduct } from '../../store/product-process/selectors';
import { getMessageContent, getMessageVisibilityStatus } from '../../store/ui-process/selectors';
import { toggleMessage } from '../../store/ui-process/ui-process';

function ProductPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const product = useAppSelector(getProduct);
  const isProductLoaded = useSelector(getLoadedProductStatus);
  const message = useAppSelector(getMessageContent);
  const isVisible = useAppSelector(getMessageVisibilityStatus);
  const [isModalActive, setModalActive] = useState(false);
  const isEscapeKey = (evt:KeyboardEvent) => evt.key === 'Escape';

  useEffect(()=>{
    if (isVisible) {
      setTimeout(() => {
        dispatch(toggleMessage());
      }, 3000);
    }
  },[isVisible, dispatch]);

  useEffect(() => {
    const id = getNumeric(location.pathname);
    dispatch(fetchProductAction(Number(id)));
  },[dispatch, location.pathname]);

  useEffect(()=>{
    const modalEscKeydown = ((evt:KeyboardEvent) => {
      if (isEscapeKey(evt)) {
        setModalActive(false);
      }
    });
    if(isModalActive) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', modalEscKeydown);
    }
    return () => {
      document.removeEventListener('keydown', modalEscKeydown);
      document.body.style.overflow = '';
    };
  },[isModalActive]);

  return(
    <>
      <SVGRoot />
      <div className="wrapper">
        <Header/>
        <main {...isModalActive
          ? { style:{paddingRight:' 15px'}}
          : ''}
        >
          <div className="page-content">
            <Breadcrumbs camera={product}/>
            {isVisible && <Message props={message}/>}
            {(isProductLoaded) && <SelectedProduct camera={product}/>}
            <Similar camera={product}/>
            <ReviewsList id={getNumeric(location.pathname)} onToggleModal={() => setModalActive((current) => !current)}/>
          </div>
        </main>
        <UpButton/>
        <ModalReview isActive={isModalActive} onToggleModal={() => setModalActive((current) => !current)} onReview={(reviewData: ReviewDataType) => console.log(reviewData)}/>
        <Footer/>
      </div>
    </>
  );
}

export default ProductPage;
