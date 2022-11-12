import { useAppSelector } from '../../../hooks/useAppSelector';
import { getSearchSuggestions } from '../../../store/product-process/selectors';
import FormSearchList from './form-search-list/form-search-list';
import { useState } from 'react';
import { ProductType } from '../../../types/product';


function SearchBar (): JSX.Element {
  const products = useAppSelector(getSearchSuggestions);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputField = document.getElementById('search') as HTMLInputElement;
  let filteredProducts = [] as ProductType[];
  if (searchQuery !== '' && products.length > 0) {
    filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }
  const handleSearchInputChange = (evt: React.SyntheticEvent) => {
    setSearchQuery((evt.target as HTMLInputElement).value);
  };
  const handleSearchResetButton = () => {
    setSearchQuery('');
    if(searchInputField !== null) {
      searchInputField.value = '';
    }
  };
  return (
    <div className={searchQuery !== '' && filteredProducts.length !== 0
      ? 'form-search list-opened'
      : 'form-search '}
    >
      <form>
        <label>
          <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-lens"></use>
          </svg>
          <input id="search" className="form-search__input" onChange={handleSearchInputChange} type="text" autoComplete="off" placeholder="Поиск по сайту"/>
        </label>
        <FormSearchList searchProducts = {filteredProducts}/>
      </form>
      <button onClick={handleSearchResetButton} className="form-search__reset" type="reset">
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg><span className="visually-hidden" >Сбросить поиск</span>
      </button>
    </div>
  );
}

export default SearchBar;
