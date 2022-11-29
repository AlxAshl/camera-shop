import { SyntheticEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SortOrder, SortType, URLParams } from '../../../const';


function SortBar(): JSX.Element {

  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState('');
  const [order, setOrder] = useState('');
  const [isInitial, setIsInitial] = useState(true);
  const [rendered, setRendered] = useState(true);

  useEffect(() => {
    if(isInitial) {
      if(searchParams.has(URLParams.Sort) && searchParams.has(URLParams.Order)) {
        setSort(searchParams.get(URLParams.Sort) as string);
        setOrder(searchParams.get(URLParams.Order) as string);
      }
      if(searchParams.has(URLParams.Order) && !searchParams.has(URLParams.Sort)) {
        setSort(SortType.Price);
        searchParams.set(URLParams.Sort, SortType.Price);
        setOrder(searchParams.get(URLParams.Order) as string);
        setSearchParams(searchParams);
      }
      if(searchParams.has(URLParams.Sort) && !searchParams.has(URLParams.Order)) {
        setOrder(SortOrder.Asc);
        searchParams.set(URLParams.Order, SortOrder.Asc);
        setSort(searchParams.get(URLParams.Order) as string);
        setSearchParams(searchParams);
      }
    }
    setIsInitial(false);
  }, [isInitial, searchParams, setSearchParams]);

  useEffect(()=>{
    if(!isInitial) {
      if(sort !== searchParams.get(URLParams.Sort) && sort !== '') {
        searchParams.set(URLParams.Sort, sort);
      }
      if(order !== searchParams.get(URLParams.Order) && order !== '') {
        searchParams.set(URLParams.Order, order);
      }
      setSearchParams(searchParams);
    }
  },[isInitial, sort, order, searchParams, setSearchParams]);

  useEffect(()=>{
    if(!rendered){
      setRendered(true);
    }
  },[rendered]);

  const handleSortChange = (evt: SyntheticEvent) => {
    const target = evt.target as HTMLInputElement;
    setSort(`${target.value}`);
    setRendered(false);
    if(order === ''){
      setOrder(SortOrder.Asc);
    }
  };

  const handleOrderChange = (evt: SyntheticEvent) => {
    const target = evt.target as HTMLInputElement;
    setOrder(`${target.value}`);
    setRendered(false);
    if(sort === '') {
      setSort(SortType.Price);
    }
  };

  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              {rendered
                ?
                <input type="radio" data-testid='sort-test' id="sortPrice" name='sort' value={SortType.Price}
                  checked={(sort === SortType.Price)}
                  onChange={(evt) =>handleSortChange(evt)}
                />
                : ''}

              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              {rendered
                ?
                <input type="radio" data-testid='sort-test' id="sortPopular" name='sort' value={SortType.Rating}
                  checked={(sort === SortType.Rating)}
                  onChange={(evt) =>handleSortChange(evt)}
                />
                : ''}
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              {rendered
                ?
                <input type="radio" data-testid='sort-test' id="up" name="icon-order" value={SortOrder.Asc} aria-label="По возрастанию"
                  checked={(order === SortOrder.Asc)}
                  onChange={(evt) => handleOrderChange(evt)}
                />
                : ''}
              <label htmlFor="up">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              {rendered
                ?
                <input type="radio" data-testid='sort-test' id="down" name="icon-order" value={SortOrder.Desc} aria-label="По убыванию"
                  checked={(order === SortOrder.Desc)}
                  onChange={(evt) => handleOrderChange(evt)}
                />
                : ''}
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

