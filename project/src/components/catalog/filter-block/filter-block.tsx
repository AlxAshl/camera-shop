import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { filtersSetter } from '../../../store/filters-process/filters-process';
import { CameraTypeBlock } from './camera-type/camera-type-block';
import { CategoryBlock } from './category/category-block';
import { LevelBlock } from './level/level-block';
import { PriceBlock } from './price/price-block';

const extraFilters = {
  minprice: [] as string[],
  maxprice: [] as string[],
  sort: [] as string[],
  order: [] as string[],
  search: [] as string[],
  level: [] as string[],
  category: [] as string[],
  type: [] as string[]
};

function FilterBlock(): JSX.Element {
  const dispatch = useAppDispatch();
  const handleFilterReset = () => {
    dispatch(filtersSetter(extraFilters));
  };

  return (
    <div className="catalog-filter">
      <form action="#">
        <h2 className="visually-hidden">Фильтр</h2>
        <PriceBlock/>
        <CategoryBlock/>
        <CameraTypeBlock/>
        <LevelBlock/>
        <button onClick={handleFilterReset} data-testid='reset-button-test' className="btn catalog-filter__reset-btn" type="reset">Сбросить фильтры
        </button>
      </form>
    </div>
  );
}

export default FilterBlock;
