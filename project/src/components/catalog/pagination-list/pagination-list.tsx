import { Link, useSearchParams } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { getProductCount } from '../../../store/product-process/selectors';
import {getPagesCount} from '../../utils/pages';
import { memo, MouseEvent } from 'react';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { getPage } from '../../../store/utils-process/selectors';
import { pageSetter } from '../../../store/utils-process/utils-process';


function PaginationList(): JSX.Element {

  const productCount = useAppSelector(getProductCount);
  const currentPage = useAppSelector(getPage);
  const dispatch = useAppDispatch();
  const totalPages = getPagesCount(productCount);
  const pages = [];
  const [urlParams] = useSearchParams();
  const newParams = urlParams.toString();

  const handlePageLinkClick = (evt: MouseEvent<HTMLLIElement>) => {
    const selectedPage = evt.currentTarget.getAttribute('data-tag');
    dispatch(pageSetter(Number(selectedPage)));
  };

  const handleBackButtonClick = (evt: MouseEvent<HTMLLIElement>) => {
    const selectedPage = currentPage - 1;
    dispatch(pageSetter(Number(selectedPage)));
  };

  const handleNextButtonClick = (evt: MouseEvent<HTMLLIElement>) => {
    const selectedPage = currentPage + 1;
    dispatch(pageSetter(Number(selectedPage)));
  };

  for(let i = 1; i <= totalPages; i++) {
    pages.push(
      <li key={`${'pages'}-${i}`} data-tag={i} className="pagination__item" data-testid='pagination-item-test' onClick={handlePageLinkClick}>
        <Link className={
          (currentPage === i)
            ? 'pagination__link pagination__link--active'
            : 'pagination__link'
        } to={`${AppRoute.Catalog}/page_${i}${(newParams ? `?${newParams}` : '')}`}
        >{i}
        </Link>
      </li>
    );
  }

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {currentPage !== 1
          ? <li className="pagination__item" data-testid='pagination-item-previous-test' onClick = {handleBackButtonClick}><Link className="pagination__link pagination__link--text" to={`${AppRoute.Catalog}/page_${currentPage - 1}${(newParams ? `?${newParams}` : '')}`}>??????????</Link></li>
          : ''}
        {pages}
        {currentPage !== totalPages && productCount !== 0
          ? <li className="pagination__item" data-testid='pagination-item-next-test' onClick = {handleNextButtonClick}><Link className="pagination__link pagination__link--text" to={`${AppRoute.Catalog}/page_${currentPage + 1}${(newParams ? `?${newParams}` : '')}`}>??????????</Link></li>
          : ''}
      </ul>
    </div>
  );
}

export default memo(PaginationList);

