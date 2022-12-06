import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { filtersSetter } from '../../../store/filters-process/filters-process';
import { CameraTypeBlock } from './camera-type/camera-type-block';
import { CategoryBlock } from './category/category-block';
import { LevelBlock } from './level/level-block';
import { PriceBlock } from './price/price-block';

function FilterBlock(): JSX.Element {
  const dispatch = useAppDispatch();

  const extraFilters = {
    PriceMin: [] as string[],
    PriceMax: [] as string[],
    Sort: [] as string[],
    Order: [] as string[],
    Search: [] as string[],
    Level: [] as string[],
    Category: [] as string[],
    Type: [] as string[]
  };

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
