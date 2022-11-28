import { useAppSelector } from '../../../hooks/useAppSelector';
import FormSearchList from './form-search-list/form-search-list';
import { useEffect, useState } from 'react';
import { ProductType } from '../../../types/product';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import {AppRoute, DEFAULT_PAGE_NUMBER, URLParams} from '../../../const';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { getCleanUpStatus, getProductsAlphabetic } from '../../../store/filters-process/selectors';
import { paramsSetter } from '../../../store/filters-process/filters-process';


function SearchBar (): JSX.Element {
  const products = useAppSelector(getProductsAlphabetic);
  const clearSearch = useAppSelector(getCleanUpStatus);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputField = document.getElementById('search') as HTMLInputElement;
  const resetButton = document.getElementById('reset');
  const [focused, setFocused] = useState(false);
  const handleSearchBarFocus = () => setFocused(true);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(()=> {
    if(clearSearch) {
      setSearchQuery('');
    }
  },[clearSearch]);

  useEffect(()=> {
    if(focused){
      const isEscapeKey = (evt:KeyboardEvent) => evt.key === 'Escape';
      const isEnterKey = (evt:KeyboardEvent) => evt.key === 'Enter';
      const handleEscKeyPress = (evt: KeyboardEvent) => {
        if(isEscapeKey(evt)) {
          setFocused(false);
          (evt.target as HTMLInputElement)?.blur();
        }
      };
      const handleEnterKeyPress = (evt: KeyboardEvent) => {
        if(isEnterKey(evt)) {
          setFocused(false);
          (evt.target as HTMLInputElement)?.blur();
          if(location.pathname.includes(AppRoute.Catalog)) {
            if (!searchParams.has(URLParams.Search)) {
              searchParams.append(URLParams.Search, searchQuery.toLowerCase());
            }
            else {
              searchParams.set(URLParams.Search, searchQuery.toLowerCase());
            }
            setSearchParams(searchParams);
          }
          else {
            navigate(`${AppRoute.Catalog}/page_${DEFAULT_PAGE_NUMBER}`);
            searchParams.append(URLParams.Search, searchQuery.toLowerCase());
            dispatch(paramsSetter(searchParams.toString()));
          }
        }
      };
      const handleMouseClickOff = (evt: MouseEvent) => {
        if(evt.target !== (searchInputField || resetButton)) {
          setFocused(false);
        }
      };
      document.addEventListener('click', handleMouseClickOff);
      document.addEventListener('keydown', handleEscKeyPress);
      document.addEventListener('keydown', handleEnterKeyPress);
      return () => {
        document.removeEventListener('click', handleMouseClickOff);
        document.removeEventListener('keydown', handleEscKeyPress);
        document.removeEventListener('keydown', handleEnterKeyPress);
      };
    }
  },[focused, searchQuery]);

  let filteredProducts = [] as ProductType[];
  if (searchQuery.length > 1 && products.length > 0) {
    filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }
  const handleSearchInputChange = (evt: React.SyntheticEvent) => {
    setSearchQuery((evt.target as HTMLInputElement).value);
  };

  const handleSearchResetButton = () => {
    setSearchQuery('');
    searchInputField.value = '';
    if (searchParams.has(URLParams.Search)) {
      searchParams.delete(URLParams.Search);
      setSearchParams(searchParams);
    }
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
          <input id="search" data-testid='search-input-test' className="form-search__input" value={searchQuery} onFocus={handleSearchBarFocus} onChange={handleSearchInputChange} type="text" autoComplete="off" placeholder="Поиск по сайту"/>
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
