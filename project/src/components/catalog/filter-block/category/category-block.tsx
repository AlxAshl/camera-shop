import { CategoryFilter } from '../../../../const';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { categoryFilterSetter } from '../../../../store/filters-process/filters-process';
import { getFilters } from '../../../../store/filters-process/selectors';
import { handleFilterInputChange } from '../../../utils/handleFilterInputChange';


export function CategoryBlock() {

  const {category} = useAppSelector(getFilters);

  return(
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Категория</legend>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input data-testid='photocamera-test' type="checkbox" name="photocamera" checked={category.includes(CategoryFilter.Camera)} onChange={
            () => handleFilterInputChange(CategoryFilter.Camera, category, categoryFilterSetter)
          }
          />
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Фотокамера</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input data-testid='videocamera-test' type="checkbox" name="videocamera" checked={category.includes(CategoryFilter.Video)} onChange={
            () => handleFilterInputChange(CategoryFilter.Video, category, categoryFilterSetter)
          }
          />
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Видеокамера</span>
        </label>
      </div>
    </fieldset>
  );
}
