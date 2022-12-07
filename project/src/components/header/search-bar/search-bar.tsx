import { useAppSelector } from '../../../hooks/useAppSelector';
import FormSearchList from './form-search-list/form-search-list';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { ProductType } from '../../../types/product';
import { useLocation, useNavigate } from 'react-router-dom';
import {AppRoute, DEFAULT_PAGE_NUMBER} from '../../../const';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { getProductsAlphabetic } from '../../../store/filters-process/selectors';
import { searchFilterSetter } from '../../../store/filters-process/filters-process';
import useInputEventListener from '../../../hooks/use-input-event-listener';


function SearchBar (): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const products = useAppSelector(getProductsAlphabetic);
  const searchInputFieldRef = useRef() as MutableRefObject<HTMLInputElement>;
  const resetButton = document.getElementById('reset');
  const [focused, setFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [initial, setInitial] = useState(true);
  const returnedSearchInput = useInputEventListener(searchInputFieldRef, searchFilterSetter);

  useEffect(()=> {
    if(location.pathname.includes(AppRoute.Catalog) && !initial) {
      setSearchQuery(returnedSearchInput);
      dispatch(searchFilterSetter([returnedSearchInput.toLowerCase()]));
      setFocused(false);
    }
    if(!location.pathname.includes(AppRoute.Catalog) && !initial) {
      navigate(`${AppRoute.Catalog}/page_${DEFAULT_PAGE_NUMBER}`);
      dispatch(searchFilterSetter([returnedSearchInput.toLowerCase()]));
      setFocused(false);
    }
    setInitial(false);
  },[returnedSearchInput]);

  const handleMouseClickOff = (evt: MouseEvent) => {
    if(evt.target !== (searchInputFieldRef.current || resetButton)) {
      setFocused(false);
    }
  };

  useEffect(()=> {
    if(focused) {
      document.addEventListener('click', handleMouseClickOff);
      return () => {
        document.removeEventListener('click', handleMouseClickOff);
      };
    }
  },[focused]);

  let filteredProducts = [] as ProductType[];
  if (searchQuery.length > 1 && products.length > 0) {
    filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }

  const handleSearchResetButton = () => {
    setSearchQuery('');
    searchInputFieldRef.current.value = '';
  };

  return (
    <div id='search-form' data-testid='search-form-test' className={searchQuery !== '' && focused
      ? 'form-search list-opened'
      : 'form-search '}
    >
      <form>
        <label>
          <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-lens"></use>
          </svg>
          <input ref={searchInputFieldRef} id="search" data-testid='search-input-test' className="form-search__input" value={searchQuery} onFocus={() => setFocused(true)} onChange={(evt)=> setSearchQuery(evt.target.value)} type="text" autoComplete="off" placeholder="Поиск по сайту"/>
        </label>
        {filteredProducts.length !== 0
          ? <FormSearchList onLinkPass={() => handleSearchResetButton()} searchProducts = {filteredProducts}/>
          : ''}
      </form>
      <button onClick={handleSearchResetButton} data-testid='search-reset-test' className="form-search__reset" id='reset' type="reset">
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg><span className="visually-hidden" >Сбросить поиск</span>
      </button>
    </div>
  );
}

export default SearchBar;
