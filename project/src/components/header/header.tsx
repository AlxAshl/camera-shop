import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useCountItems } from '../../hooks/use-count-items';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getBasketProducts } from '../../store/basket-process/selectors';
import NavBar from '../nav-bar/nav-bar';
import SearchBar from './search-bar/search-bar';


function Header():JSX.Element {
  const basketItems = useAppSelector(getBasketProducts);
  const number = useCountItems(basketItems);
  return (
    <header className="header" id="header">
      <div className="container">
        <a className="header__logo" href="index.html" aria-label="Переход на главную">
          <svg width="100" height="36" aria-hidden="true">
            <use xlinkHref="#icon-logo"></use>
          </svg>
        </a>
        <NavBar/>
        <div className="form-search">
          <SearchBar/>
        </div>
        <Link className="header__basket-link" to={AppRoute.Basket}>
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
          {number > 0
            ? <span className="header__basket-count" data-testid='header-quantity-test'>{number}</span>
            : ''}
        </Link>
      </div>
    </header>
  );
}
export default Header;
