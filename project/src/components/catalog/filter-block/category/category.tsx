import { useSearchParams } from 'react-router-dom';
import { categoryFilter, URLParams } from '../../../../const';


export function Category() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilters = searchParams.getAll(URLParams.Category);

  const handleCategoryInputChange = (type: string) => {
    if (!categoryFilters.includes(type)) {
      searchParams.append(URLParams.Category, type);
    }
    else {
      const categoryFilterArray = categoryFilters.filter((entry) => entry !== type);
      searchParams.delete(URLParams.Category);
      categoryFilterArray.forEach((entry) => {
        searchParams.append(URLParams.Category, entry);
      });
    }
    setSearchParams(searchParams);
  };

  return(
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Категория</legend>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox" name="photocamera" checked={categoryFilters.includes(categoryFilter.Camera)} onChange={() => handleCategoryInputChange(categoryFilter.Camera)}/>
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Фотокамера</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox" name="videocamera" checked={categoryFilters.includes(categoryFilter.Video)} onChange={() => handleCategoryInputChange(categoryFilter.Video)}/>
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Видеокамера</span>
        </label>
      </div>
    </fieldset>
  );
}
