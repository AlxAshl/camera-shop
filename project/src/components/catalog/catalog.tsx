import { useAppSelector } from '../../hooks/index';
import { getLoadedDataStatus, getProducts } from '../../store/product-process/selectors';
import CardsCatalog from '../cards-catalog/cards-catalog';
import FilterBlock from '../filter-block/filter-block';
import PaginationList from '../pagination-list/pagination-list';
import SortBar from '../sort-bar/sort-bar';


function Catalog(): JSX.Element {

  const isDataLoaded = useAppSelector(getLoadedDataStatus);
  const products = useAppSelector(getProducts);

  return (
    <section className="catalog">
      <div className="container">
        <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
        <div className="page-content__columns">
          <FilterBlock/>
          <div className="catalog__content">
            <SortBar/>
            {isDataLoaded && <CardsCatalog products={products} />}
            <PaginationList/>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Catalog;
