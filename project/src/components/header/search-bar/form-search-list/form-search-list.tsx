import { Link } from 'react-router-dom';
import { AppRoute } from '../../../../const';
import { ProductType } from '../../../../types/product';
type FormSearchListType = {
  searchProducts: ProductType[];
  onLinkPass: () => void;
}
function FormSearchList ({searchProducts, onLinkPass}: FormSearchListType): JSX.Element {

  return (
    <ul className="form-search__select-list scroller" >
      {searchProducts.map((query) => (
        <Link onClick={() => onLinkPass()} key = {query.name} to={`${AppRoute.Product}/${query.id}`}>
          <li className="form-search__select-item">{query.name}</li>
        </Link>
      ))}
    </ul>
  );
}

export default FormSearchList;
