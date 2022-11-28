import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SortOrder, SortType, URLParams } from '../../../const';

function SortBar(): JSX.Element {

  const [searchParams, setSearchParams] = useSearchParams();

  const handleOrderChange = (type: string) => {
    searchParams.set(URLParams.Sort, type);
    if (!searchParams.has(URLParams.Order)) {
      searchParams.set(URLParams.Order, SortOrder.Asc);
    }
    setSearchParams(searchParams);
  };

  const handleSortTypeChange = (type: string) => {
    searchParams.set(URLParams.Order, type);
    if (!searchParams.has(URLParams.Sort)) {
      searchParams.set(URLParams.Sort, SortType.Price);
    }
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (searchParams.has(URLParams.Sort) && !searchParams.has(URLParams.Order)) {
      setSearchParams(searchParams);
    }

    if (searchParams.has(URLParams.Order) && !searchParams.has(URLParams.Sort)) {
      searchParams.set(URLParams.Sort, SortType.Price);
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);

  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input type="radio" data-testid='sort-test' id="sortPrice" name="sort" onChange={() => handleOrderChange(SortType.Price)} checked={searchParams.get(URLParams.Sort) === SortType.Price}/>
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input type="radio" data-testid='sort-test' id="sortPopular" name="sort" onChange={() => handleOrderChange(SortType.Rating)} checked={searchParams.get(URLParams.Sort) === SortType.Rating}/>
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input type="radio" data-testid='sort-test' id="up" name="sort-icon" aria-label="По возрастанию" onChange={() => handleSortTypeChange(SortOrder.Asc)} checked={searchParams.get(URLParams.Order) === SortOrder.Asc}/>
              <label htmlFor="up">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input type="radio" data-testid='sort-test' id="down" name="sort-icon" aria-label="По убыванию" onChange={() => handleSortTypeChange(SortOrder.Desc)} checked={searchParams.get(URLParams.Order) === SortOrder.Desc}/>
              <label htmlFor="down">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SortBar;
