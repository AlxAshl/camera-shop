import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchSimilarProductsAction } from '../../../store/api-actions';
import { getLoadedProductsStatus, getProducts } from '../../../store/product-process/selectors';
import { ProductType } from '../../../types/product';
import ProductCard from '../../product-card/product-card';


interface SimilarProps {
  camera: ProductType;
}

function Similar({camera}: SimilarProps): JSX.Element {
  const {id} = camera;
  const dispatch = useAppDispatch();
  const similarProducts = useAppSelector(getProducts);
  const isDataLoaded = useAppSelector(getLoadedProductsStatus);

  const [slice, setPrimary] = useState({
    start: 0,
    end: 3,
  });

  const products = similarProducts.slice(slice.start, slice.end);
  useEffect(()=>{
    if(id) {
      dispatch(fetchSimilarProductsAction(id));
    }
  },[dispatch, id]);

  const handleNextSlideButton = () => {
    setPrimary({start: slice.start + 3, end: slice.end + 3});
  };
  const handlePreviousSlideButton = () => {
    setPrimary({start: slice.start - 3, end: slice.end - 3});
  };

  return (
    <div className="page-content__section">
      <section className="product-similar">
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>
          <div className="product-similar__slider">
            <div className="product-similar__slider-list">
              {isDataLoaded && products.map((product) => (
                <ProductCard key={product.id} isSimilar product = {product}/>
              ))}
            </div>
            <button className="slider-controls slider-controls--prev" onClick={handlePreviousSlideButton} type="button" aria-label="Предыдущий слайд" disabled={slice.start === 0}>
              <svg width="7" height="12" aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
            <button className="slider-controls slider-controls--next" onClick={handleNextSlideButton} type="button" aria-label="Следующий слайд" disabled={slice.end >= similarProducts.length}>
              <svg width="7" height="12" aria-hidden="true" >
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Similar;
