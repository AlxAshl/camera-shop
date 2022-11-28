import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CategoryFilter, TypeFilter, URLParams } from '../../../../const';


export function CameraType() {

  const [searchParams, setSearchParams] = useSearchParams();
  const videoCam: HTMLInputElement | null = document.querySelector('input[name="videocamera"]');
  const photoCam: HTMLInputElement | null = document.querySelector('input[name="photocamera"]');
  const typeFilters = searchParams.getAll(URLParams.Type);
  const categoryFilters = searchParams.getAll(URLParams.Category);

  const handleTypeInputChange = (type: string) => {
    if (!typeFilters.includes(type)) {
      searchParams.append(URLParams.Type, type);
    }
    else {
      const typeFilterArray = typeFilters.filter((entry) => entry !== type);
      searchParams.delete(URLParams.Type);
      typeFilterArray.forEach((entry) => {
        searchParams.append(URLParams.Type, entry);
      });
    }
    setSearchParams(searchParams);
  };

  useEffect(()=>{
    if(categoryFilters.includes(CategoryFilter.Video) && (typeFilters.includes(TypeFilter.Film) || typeFilters.includes(TypeFilter.Instant)) && !categoryFilters.includes(CategoryFilter.Camera)) {
      const typeFilterArray = typeFilters.filter((entry) => entry !== TypeFilter.Film).filter((entry) => entry !== TypeFilter.Instant);
      searchParams.delete(URLParams.Type);
      typeFilterArray.forEach((entry) => {
        searchParams.append(URLParams.Type, entry);
      });
      setSearchParams(searchParams);
    }
  },[categoryFilters]);

  return(
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Тип камеры</legend>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox" data-testid='digital-test' name="digital" checked={typeFilters.includes(TypeFilter.Digital)} onChange={() => handleTypeInputChange(TypeFilter.Digital)}/>
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Цифровая</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox" data-testid='film-test' name="film" checked={typeFilters.includes(TypeFilter.Film)} disabled={videoCam?.checked && !photoCam?.checked} onChange={() =>handleTypeInputChange(TypeFilter.Film)}/>
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Плёночная</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox" data-testid='snapshot-test' name="snapshot" checked={typeFilters.includes(TypeFilter.Instant)} disabled={videoCam?.checked && !photoCam?.checked} onChange={() =>handleTypeInputChange(TypeFilter.Instant)}/>
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Моментальная</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox" data-testid='collection-test' name="collection" checked={typeFilters.includes(TypeFilter.Collectible)} onChange={() =>handleTypeInputChange(TypeFilter.Collectible)}/>
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Коллекционная</span>
        </label>
      </div>
    </fieldset>
  );
}
