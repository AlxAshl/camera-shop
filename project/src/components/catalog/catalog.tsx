import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { fetchProductAction } from '../../store/api-actions';
import { getLoadedProductsStatus, getPage, getProducts } from '../../store/product-process/selectors';
import CardsCatalog from '../cards-catalog/cards-catalog';
import FilterBlock from '../filter-block/filter-block';
import PaginationList from '../pagination-list/pagination-list';
import Preloader from '../preloader/preloader';
import SortBar from '../sort-bar/sort-bar';


function Catalog(): JSX.Element {

  const dispatch = useAppDispatch();
  const isDataLoaded = useAppSelector(getLoadedProductsStatus);
  const currentPage = useAppSelector(getPage);
  const products = useAppSelector(getProducts);

  useEffect(()=>{
    dispatch(fetchProductAction());
  },[currentPage, dispatch]);


  return (
    <section className="catalog">
      <div className="container">
        <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
        <div className="page-content__columns">
          <FilterBlock/>
          <div className="catalog__content">
            <SortBar/>
            {isDataLoaded
              ? <CardsCatalog products={products} />
              : <Preloader/>}
            {isDataLoaded
              ? <PaginationList/>
              : ''}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Catalog;
