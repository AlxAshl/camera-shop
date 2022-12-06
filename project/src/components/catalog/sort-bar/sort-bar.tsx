import React from 'react';
import { SortOrder, SortType } from '../../../const';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { orderFilterSetter, sortFilterSetter } from '../../../store/filters-process/filters-process';
import { getFilters } from '../../../store/filters-process/selectors';


function SortBar(): JSX.Element {

  const {Sort, Order} = useAppSelector(getFilters);
  const dispatch = useAppDispatch();

  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input type="radio" data-testid='sort-test' id="sortPrice" name='sort' value={SortType.Price}
                checked={(Sort[0] === SortType.Price)}
                onChange={() => dispatch(sortFilterSetter([SortType.Price]))}
              />
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input type="radio" data-testid='sort-test' id="sortPopular" name='sort' value={SortType.Rating}
                checked={(Sort[0] === SortType.Rating)}
                onChange={() => dispatch(sortFilterSetter([SortType.Rating]))}
              />
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input type="radio" data-testid='sort-test' id="up" name="icon-order" value={SortOrder.Asc} aria-label="По возрастанию"
                checked={(Order[0] === SortOrder.Asc)}
                onChange={() => dispatch(orderFilterSetter([SortOrder.Asc]))}
              />
              <label htmlFor="up">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input type="radio" data-testid='sort-test' id="down" name="icon-order" value={SortOrder.Desc} aria-label="По убыванию"
                checked={(Order[0] === SortOrder.Desc)}
                onChange={() => dispatch(orderFilterSetter([SortOrder.Desc]))}
              />
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

