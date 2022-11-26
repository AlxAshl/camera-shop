import { useSearchParams } from 'react-router-dom';
import { levelFilter, URLParams } from '../../../../const';


export function Level() {
  const [searchParams, setSearchParams] = useSearchParams();
  const levelFilters = searchParams.getAll(URLParams.Level);

  const handleLevelInputChange = (type: string) => {
    if (!levelFilters.includes(type)) {
      searchParams.append(URLParams.Level, type);
    }
    else {
      const levelFilterArray = levelFilters.filter((entry) => entry !== type);
      searchParams.delete(URLParams.Level);
      levelFilterArray.forEach((entry) => {
        searchParams.append(URLParams.Level, entry);
      });
    }
    setSearchParams(searchParams);
  };

  return(
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Уровень</legend>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox" name="zero" checked={levelFilters.includes(levelFilter.Novice)} onChange={() => handleLevelInputChange(levelFilter.Novice)}/>
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Нулевой</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox" name="non-professional" checked={levelFilters.includes(levelFilter.Amateur)} onChange={() => handleLevelInputChange(levelFilter.Amateur)}/>
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Любительский</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox" name="professional" checked={levelFilters.includes(levelFilter.Pro)} onChange={() => handleLevelInputChange(levelFilter.Pro)}/>
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Профессиональный</span>
        </label>
      </div>
    </fieldset>
  );
}
