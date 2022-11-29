import { useSearchParams } from 'react-router-dom';
import { URLParams } from '../../../const';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { fieldCleaner } from '../../../store/filters-process/filters-process';
import { CameraType } from './camera-type/camera-type';
import { Category } from './category/category';
import { Level } from './level/level';
import { Price } from './price/price';

function FilterBlock(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const handleFilterReset = () => {
    Object.entries(URLParams).forEach(([key, value]) => searchParams.delete(value));
    setSearchParams(searchParams);
    dispatch(fieldCleaner());
  };
  return (
    <div className="catalog-filter">
      <form action="#">
        <h2 className="visually-hidden">Фильтр</h2>
        <Price/>
        <Category/>
        <CameraType/>
        <Level/>
        <button onClick={handleFilterReset} data-testid='reset-button-test' className="btn catalog-filter__reset-btn" type="reset">Сбросить фильтры
        </button>
      </form>
    </div>
  );
}

export default FilterBlock;
