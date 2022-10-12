// import { current } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchAllProductsAction } from '../../store/api-actions';
import {/* getAllProducts,*/ getLoadedProductsStatus, getProducts } from '../../store/product-process/selectors';
import { ProductType } from '../../types/product';
import ProductCard from '../product-card/product-card';

interface SimilarProps {
  camera: ProductType;
}

function Similar({camera}: SimilarProps): JSX.Element {
  const {type, level, category, name} = camera;
  const dispatch = useAppDispatch();
  const allProducts = useAppSelector(getProducts);
  const isDataLoaded = useAppSelector(getLoadedProductsStatus);

  const filteredProducts = allProducts.filter((product) => product.type === type)
    .filter((product) => product.level === level)
    .filter((product) => product.category === category)
    .filter((product) => product.name !== name);

  const [slice, setPrimary] = useState({
    start: 0,
    end: 3,
  });

  const products = filteredProducts.slice(slice.start, slice.end);
  useEffect(()=>{
    dispatch(fetchAllProductsAction());
  },[dispatch]);

  const handleNextSlideButton = () => {
    setPrimary({start: slice.start + 3, end: slice.end + 3});
  };
  const handlePreviousSlideButton = () => {
    setPrimary({start: slice.start - 3, end: slice.end - 3});
  };

  if((products.length !== 0) && isDataLoaded) {
    return (
      <div className="page-content__section">
        <section className="product-similar">
          <div className="container">
            <h2 className="title title--h3">Похожие товары</h2>
            <div className="product-similar__slider">
              <div className="product-similar__slider-list">
                {products.map((product) => (
                  <ProductCard key={product.id} isSimilar product = {product}/>
                ))}
              </div>
              <button className="slider-controls slider-controls--prev" onClick={handlePreviousSlideButton} type="button" aria-label="Предыдущий слайд" disabled={slice.start === 0}>
                <svg width="7" height="12" aria-hidden="true">
                  <use xlinkHref="#icon-arrow"></use>
                </svg>
              </button>
              <button className="slider-controls slider-controls--next" onClick={handleNextSlideButton} type="button" aria-label="Следующий слайд" disabled={slice.end >= filteredProducts.length}>
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
  else {
    return <div></div>;
  }
}

export default Similar;
