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
import { pageSetter, pageUpdateSetter, paramsSetter } from '../../store/utils-process/utils-process';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getPage, getPageUpdateStatus, getParams, getParamsUpdateStatus } from '../../store/utils-process/selectors';


function Catalog(): JSX.Element {

  const isDataLoaded = useAppSelector(getLoadedProductsStatus);
  const products = useAppSelector(getProducts);
  const updateStatus = useAppSelector(getParamsUpdateStatus);
  const updatedParams = useAppSelector(getParams);
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(getPage);
  const location = useLocation();
  const [initialLoad, setInitialLoad] = useState(true);
  const pageUpdateStatus = useAppSelector(getPageUpdateStatus);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if(getNumeric(location.pathname) !== currentPage) {
      dispatch(pageSetter(getNumeric(location.pathname)));
    }
  },[currentPage, dispatch, location]);

  useEffect(()=>{
    const urlParams = searchParams.toString();
    const params = {currentPage, urlParams};
    if(updateStatus) {
      dispatch(fetchProductsAction({...params, urlParams: updatedParams as string}));
      setSearchParams(updatedParams as string);
      dispatch(paramsSetter(''));
      dispatch(pageUpdateSetter(false));
    }
    if(!initialLoad) {
      if(!updateStatus && pageUpdateStatus) {
        dispatch(fetchProductsAction(params));
      }
      dispatch(pageUpdateSetter(true));
    }
  },[dispatch, initialLoad, currentPage, searchParams, updateStatus, pageUpdateStatus, setSearchParams, updatedParams]);

  useEffect(()=>{
    if(!initialLoad) {
      dispatch(fetchAllProductsAction());
    }
  },[initialLoad, dispatch, pageUpdateStatus]);

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
