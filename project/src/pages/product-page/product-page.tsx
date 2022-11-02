import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import ModalReview from '../../components/modal/modal-review/modal-review';
import ModalSuccess from '../../components/modal/modal-success/modal-success';
import ReviewsList from '../../components/reviews-list/reviews-list';
import SelectedProduct from '../../components/catalog/selected-product/selected-product';
import SimilarProducts from '../../components/catalog/similar-products/similar-products';
import Message from '../../components/ui/message';
import UpButton from '../../components/up-button/up-button';
import { useAppSelector } from '../../hooks/useAppSelector';
import { fetchProductAction } from '../../store/api-actions';
import { getLoadedProductStatus, getProduct } from '../../store/product-process/selectors';
import { getMessageContent, getMessageVisibilityStatus, getModalCartVisibilityStatus, getModalSuccessVisibilityStatus, getModalVisibilityStatus } from '../../store/utils-process/selectors';
import { messageToggler } from '../../store/utils-process/utils-process';
import ModalAddToCart from '../../components/modal/modal-add-to-cart/modal-add-to-cart';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import NotFoundContent from '../not-found/not-found-contents';


function ProductPage(): JSX.Element {

  const dispatch = useAppDispatch();
  const params = useParams();
  const {id} = params;
  const product = useAppSelector(getProduct);
  const isProductLoaded = useSelector(getLoadedProductStatus);
  const message = useAppSelector(getMessageContent);
  const isVisible = useAppSelector(getMessageVisibilityStatus);
  const isReviewActive = useAppSelector(getModalVisibilityStatus);
  const isSuccessActive = useAppSelector(getModalSuccessVisibilityStatus);
  const isCartActive = useAppSelector(getModalCartVisibilityStatus);
  const [errorOccured, setErrorOccured] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        dispatch(messageToggler());
      }, 3000);
    }
  },[isVisible, dispatch]);

  useEffect(() => {
    if(isVisible){
      setErrorOccured(true);
    }
  },[isVisible]);

  useEffect(() => {
    dispatch(fetchProductAction(Number(id)));
  },[dispatch, id]);

  return(
    <>
      <main {...isReviewActive || isSuccessActive
        ? { style:{paddingRight: '17px'}}
        : ''}
      >
        <div className="page-content">
          <Breadcrumbs/>
          {isVisible && <Message props={message}/>}
          {errorOccured && <NotFoundContent>product</NotFoundContent>}
          {(isProductLoaded) && <SelectedProduct camera={product}/>}
          <SimilarProducts camera={product}/>
          <ReviewsList id={Number(id)}/>
        </div>
      </main>
      <UpButton/>
      {isCartActive
        ? <ModalAddToCart isAddToCartActive={isCartActive}/>
        : ''}
      {isReviewActive
        ? <ModalReview isReviewActive={isReviewActive} id={Number(id)}/>
        : ''}
      {isSuccessActive
        ? <ModalSuccess isSuccessActive={isSuccessActive}/>
        : ''}
    </>
  );
}

export default ProductPage;
