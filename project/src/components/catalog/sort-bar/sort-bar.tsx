import { SyntheticEvent, useEffect, useState } from 'react';
import { SortOrder, SortType } from '../../../const';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { orderFilterSetter, sortFilterSetter } from '../../../store/filters-process/filters-process';
import { getFilters } from '../../../store/filters-process/selectors';


function SortBar(): JSX.Element {

  const {Sort, Order} = useAppSelector(getFilters);
  const [rendered, setRendered] = useState(true);
  const [sortFilter, setSortFilter] = useState(Sort);
  const [orderFilter, setOrderFilter] = useState(Order);
  const dispatch = useAppDispatch();

  const handleSortChange = (evt: SyntheticEvent) => {
    const target = evt.target as HTMLInputElement;
    setSortFilter([`${target.value}`]);
  };
  const handleOrderChange = (evt: SyntheticEvent) => {
    const target = evt.target as HTMLInputElement;
    setOrderFilter([`${target.value}`]);
  };

  useEffect(()=> {
    if(Order.length !== 0 && Sort.length === 0) {
      setSortFilter([SortType.Price]);
    }
    if(Sort.length !== 0 && Order.length === 0) {
      setOrderFilter([SortOrder.Asc]);
    }
  },[Sort, Order]);

  useEffect(()=>{
    dispatch(orderFilterSetter(orderFilter));
    setRendered(false);
  },[orderFilter, dispatch]);

  useEffect(()=>{
    dispatch(sortFilterSetter(sortFilter));
    setRendered(false);
  },[sortFilter, dispatch]);

  // Костыль для решения проблемы обновления UI (если не форсить рендер, то кнопки не перерисовываются при изменении).
  useEffect(()=>{
    if(!rendered) {
      setRendered(true);
    }
  },[rendered]);

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
                  checked={(Sort[0] === SortType.Price)}
                  onChange={(evt) =>handleSortChange(evt)}
                />
                : ''}
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              {rendered
                ?
                <input type="radio" data-testid='sort-test' id="sortPopular" name='sort' value={SortType.Rating}
                  checked={(Sort[0] === SortType.Rating)}
                  onChange={(evt) => handleSortChange(evt)}
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
                  checked={(Order[0] === SortOrder.Asc)}
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
                  checked={(Order[0] === SortOrder.Desc)}
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

