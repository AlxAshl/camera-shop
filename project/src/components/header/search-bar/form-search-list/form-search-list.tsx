import { Link } from 'react-router-dom';
import { AppRoute } from '../../../../const';
import { ProductType } from '../../../../types/product';
type FormSearchListType = {
  searchProducts: ProductType[];
}
function FormSearchList ({searchProducts}: FormSearchListType): JSX.Element {

  return (
    <ul className="form-search__select-list" >
      {searchProducts.map((query) => (
        <Link key = {query.name} to={`${AppRoute.Product}/${query.id}`}>
          <li className="form-search__select-item">{query.name}</li>
        </Link>
      ))}
      {/* <li className="form-search__select-item">Cannonball Pro MX 7i</li>
      <li className="form-search__select-item">Cannonball Pro MX 6i</li>
      <li className="form-search__select-item">Cannonball Pro MX 5i</li>
      <li className="form-search__select-item">Cannonball Pro MX 4i</li> */}
    </ul>
  );
}

export default FormSearchList;
