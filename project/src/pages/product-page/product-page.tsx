import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import ModalReview from '../../components/modal/modal-review/modal-review';
import ModalSuccess from '../../components/modal/modal-success/modal-success';
import ReviewsList from '../../components/reviews-list/reviews-list';
import SelectedProduct from '../../components/catalog/selected-product/selected-product';
import SimilarProducts from '../../components/catalog/similar-products/similar-products';
import UpButton from '../../components/up-button/up-button';
import { useAppSelector } from '../../hooks/useAppSelector';
import { fetchProductAction } from '../../store/api-actions';
import { getLoadedProductStatus, getProduct } from '../../store/product-process/selectors';
import { getMessageVisibilityStatus, getModalCartVisibilityStatus, getModalSuccessVisibilityStatus, getModalVisibilityStatus } from '../../store/utils-process/selectors';
import ModalAddToCart from '../../components/modal/modal-add-to-cart/modal-add-to-cart';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { AppRoute } from '../../const';


function ProductPage(): JSX.Element {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const {id} = params;
  const product = useAppSelector(getProduct);
  const isProductLoaded = useSelector(getLoadedProductStatus);
  const isVisible = useAppSelector(getMessageVisibilityStatus);
  const isReviewActive = useAppSelector(getModalVisibilityStatus);
  const isSuccessActive = useAppSelector(getModalSuccessVisibilityStatus);
  const isCartActive = useAppSelector(getModalCartVisibilityStatus);

  useEffect(() => {
    if (isVisible) {
      navigate(AppRoute.NotFoundPage);
    }
  },[isVisible, dispatch, navigate]);

  useEffect(() => {
    dispatch(fetchProductAction(Number(id)));
  },[dispatch, id]);

  return(
    <>
      <main {...isReviewActive || isSuccessActive || isCartActive
        ? { style:{paddingRight: '17px'}}
        : ''}
      >
        <div className="page-content">
          <Breadcrumbs/>
          {(isProductLoaded) && <SelectedProduct camera={product}/>}
          <SimilarProducts camera={product}/>
          <ReviewsList id={Number(id)}/>
        </div>
      </main>
      <UpButton/>
      {isCartActive
        ? <ModalAddToCart/>
        : ''}
      {isReviewActive
        ? <ModalReview id={Number(id)}/>
        : ''}
      {isSuccessActive
        ? <ModalSuccess/>
        : ''}
    </>
  );
}

export default ProductPage;
