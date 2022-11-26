import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { categoryFilter, typeFilter, URLParams } from '../../../../const';


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
    if(categoryFilters.includes(categoryFilter.Video) && (typeFilters.includes(typeFilter.Film) || typeFilters.includes(typeFilter.Instant)) && !categoryFilters.includes(categoryFilter.Camera)) {
      const typeFilterArray = typeFilters.filter((entry) => entry !== typeFilter.Film).filter((entry) => entry !== typeFilter.Instant);
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
          <input type="checkbox" name="digital" checked={typeFilters.includes(typeFilter.Digital)} onChange={() => handleTypeInputChange(typeFilter.Digital)}/>
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Цифровая</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox" name="film" checked={typeFilters.includes(typeFilter.Film)} disabled={videoCam?.checked && !photoCam?.checked} onChange={() =>handleTypeInputChange(typeFilter.Film)}/>
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Плёночная</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox" name="snapshot" checked={typeFilters.includes(typeFilter.Instant)} disabled={videoCam?.checked && !photoCam?.checked} onChange={() =>handleTypeInputChange(typeFilter.Instant)}/>
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Моментальная</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox" name="collection" checked={typeFilters.includes(typeFilter.Collectible)} onChange={() =>handleTypeInputChange(typeFilter.Collectible)}/>
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Коллекционная</span>
        </label>
      </div>
    </fieldset>
  );
}
