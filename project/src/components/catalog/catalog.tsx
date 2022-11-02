import { useAppSelector } from '../../hooks/useAppSelector';
import { getLoadedProductsStatus, getProducts } from '../../store/product-process/selectors';
import CardsList from '../cards-list/cards-list';
import FilterBlock from './filter-block/filter-block';
import PaginationList from './pagination-list/pagination-list';
import Preloader from '../preloader/preloader';
import SortBar from './sort-bar/sort-bar';
import { useEffect } from 'react';
import { fetchPromoAction } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks/useAppDispatch';


function Catalog(): JSX.Element {

  const isDataLoaded = useAppSelector(getLoadedProductsStatus);
  const products = useAppSelector(getProducts);
  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(fetchPromoAction());
  },[dispatch]);

  return (
    <section className="catalog">
      <div className="container">
        <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
        <div className="page-content__columns">
          <FilterBlock/>
          <div className="catalog__content">
            <SortBar/>
            {isDataLoaded
              ? <CardsList products={products} />
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
