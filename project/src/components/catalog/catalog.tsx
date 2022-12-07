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
import { getFilters, getPageUpdateStatus } from '../../store/filters-process/selectors';
import { filtersSetter, pageUpdateSetter } from '../../store/filters-process/filters-process';
import { URLParams } from '../../const';


function Catalog(): JSX.Element {

  const isDataLoaded = useAppSelector(getLoadedProductsStatus);
  const products = useAppSelector(getProducts);
  const allFilters = useAppSelector(getFilters);
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(getPage);
  const pageUpdate = useAppSelector(getPageUpdateStatus);
  const location = useLocation();
  const [initialLoad, setInitialLoad] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState(allFilters);

  useEffect(()=> {
    if(initialLoad) {
      Object.entries(URLParams).forEach(([key, value]) => {
        if (searchParams.has(value)) {
          setFilters((prevState) => ({...prevState, [key.toLowerCase()]: searchParams.getAll(value)}));
        }
      });
      setInitialLoad(false);
    }
    else{
      dispatch(fetchAllProductsAction());
    }
    dispatch(filtersSetter(filters));
  },[initialLoad]);

  useEffect(()=>{
    const newParams = new URLSearchParams();
    Object.entries(allFilters).forEach((key, value) => {
      const [paramsName, [paramsValue]] = key;
      if(paramsValue !== undefined && key[1].length < 2) {
        newParams.append(URLParams[(paramsName.charAt(0).toUpperCase() + paramsName.slice(1)) as keyof typeof URLParams] , paramsValue);
      }
      if(paramsValue !== undefined && key[1].length >= 2) {
        key[1].forEach((paramsValueEntry)=> {
          newParams.append(URLParams[(paramsName.charAt(0).toUpperCase() + paramsName.slice(1)) as keyof typeof URLParams] , paramsValueEntry);
        });
      }
    });
    setSearchParams(newParams);
  },[allFilters, currentPage]);

  useEffect(() => {
    if(getNumeric(location.pathname) !== currentPage) {
      dispatch(pageSetter(getNumeric(location.pathname)));
    }
  },[currentPage, dispatch, location]);

  useEffect(()=>{
    const urlParams = searchParams.toString();
    const params = {currentPage, urlParams};
    if(!initialLoad && !pageUpdate) {
      dispatch(fetchProductsAction(params));
    }
    dispatch(pageUpdateSetter(false));
  },[initialLoad, searchParams, setSearchParams]);

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

