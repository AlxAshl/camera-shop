import { useAppSelector } from '../../hooks/useAppSelector';
import { getLoadedProductsStatus, getProducts } from '../../store/product-process/selectors';
import CardsList from '../cards-list/cards-list';
import FilterBlock from './filter-block/filter-block';
import PaginationList from './pagination-list/pagination-list';
import Preloader from '../preloader/preloader';
import SortBar from './sort-bar/sort-bar';
import { useEffect, useState } from 'react';
import { fetchAllProductsAction, fetchProductsAction } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { getNumeric } from '../utils/pages';
import { pageSetter } from '../../store/utils-process/utils-process';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getPage } from '../../store/utils-process/selectors';
import { getParams, getParamsUpdateStatus } from '../../store/filters-process/selectors';
import { paramsSetter } from '../../store/filters-process/filters-process';


function Catalog(): JSX.Element {

  const isDataLoaded = useAppSelector(getLoadedProductsStatus);
  const products = useAppSelector(getProducts);
  const paramsUpdateStatus = useAppSelector(getParamsUpdateStatus);
  const updatedParams = useAppSelector(getParams);
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(getPage);
  const location = useLocation();
  const [initialLoad, setInitialLoad] = useState(true);
  const [pageUpdateStatus, setPageUpdateStatus] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if(getNumeric(location.pathname) !== currentPage) {
      dispatch(pageSetter(getNumeric(location.pathname)));
    }
  },[currentPage, dispatch, location]);

  useEffect(()=>{
    const urlParams = searchParams.toString();
    const params = {currentPage, urlParams};
    if(paramsUpdateStatus) {
      setSearchParams(updatedParams as string);
      dispatch(paramsSetter(''));
      setPageUpdateStatus(false);
    }
    if(!initialLoad) {
      if(!paramsUpdateStatus && pageUpdateStatus) {
        dispatch(fetchProductsAction(params));
      }
    }
    setPageUpdateStatus(true);
  },[initialLoad, searchParams, setSearchParams, updatedParams, pageUpdateStatus]);

  useEffect(()=>{
    if(!initialLoad) {
      dispatch(fetchAllProductsAction());
    }
  },[initialLoad, dispatch]);

  useEffect(()=>{
    setInitialLoad(false);
  },[]);

  return (
    <section className="catalog">
      <div className="container">
        <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
        <div className="page-content__columns">
          <div className="catalog__aside">
            <FilterBlock/>
          </div>
          <div className="catalog__content">
            <SortBar/>
            {isDataLoaded
              ? <CardsList products={products} />
              : <Preloader/>}
            {isDataLoaded
              ? <PaginationList/>
              : ''}
            {products.length === 0 && isDataLoaded
              ? <div>По вашему запросу ничего не найдено</div>
              : ''}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Catalog;
