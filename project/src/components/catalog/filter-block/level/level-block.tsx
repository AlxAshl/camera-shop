import { LevelFilter } from '../../../../const';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { levelFilterSetter } from '../../../../store/filters-process/filters-process';
import { getFilters } from '../../../../store/filters-process/selectors';
import { handleFilterInputChange } from '../../../utils/handleFilterInputChange';


export function LevelBlock() {

  const {level} = useAppSelector(getFilters);

  return(
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Уровень</legend>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input data-testid='level-zero-test' type="checkbox" name="zero" checked={level.includes(LevelFilter.Novice)} onChange={
            () => handleFilterInputChange(LevelFilter.Novice, level, levelFilterSetter)
          }
          />
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Нулевой</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input data-testid='level-amateur-test' type="checkbox" name="non-professional" checked={level.includes(LevelFilter.Amateur)} onChange={
            () => handleFilterInputChange(LevelFilter.Amateur, level, levelFilterSetter)
          }
          />
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Любительский</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input data-testid='level-pro-test' type="checkbox" name="professional" checked={level.includes(LevelFilter.Pro)} onChange={
            () => handleFilterInputChange(LevelFilter.Pro, level, levelFilterSetter)
          }
          />
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Профессиональный</span>
        </label>
      </div>
    </fieldset>
  );
}
