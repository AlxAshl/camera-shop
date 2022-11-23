import { useAppSelector } from '../../hooks/useAppSelector';
import { getLoadedProductsStatus, getProducts } from '../../store/product-process/selectors';
import CardsList from '../cards-list/cards-list';
import FilterBlock from './filter-block/filter-block';
import PaginationList from './pagination-list/pagination-list';
import Preloader from '../preloader/preloader';
import SortBar from './sort-bar/sort-bar';
import { useEffect, useState } from 'react';
import { fetchProductsAction } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { getNumeric } from '../utils/pages';
import { pageSetter } from '../../store/utils-process/utils-process';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getPage } from '../../store/utils-process/selectors';


function Catalog(): JSX.Element {

  const isDataLoaded = useAppSelector(getLoadedProductsStatus);
  const products = useAppSelector(getProducts);
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(getPage);
  const location = useLocation();
  const [initialLoad, setInitialLoad] = useState(true);
  const [urlParams] = useSearchParams();

  useEffect(() => {
    if(getNumeric(location.pathname) !== currentPage) {
      dispatch(pageSetter(getNumeric(location.pathname)));
    }
  },[currentPage, dispatch, location]);

  useEffect(()=>{
    const newParams = urlParams.toString();
    const params = {currentPage, newParams};
    if(!initialLoad) {
      dispatch(fetchProductsAction(params));
    }
  },[dispatch, currentPage, initialLoad, urlParams]);

  useEffect(()=>{
    setInitialLoad(false);
  },[]);

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
