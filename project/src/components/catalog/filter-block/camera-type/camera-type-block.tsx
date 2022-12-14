import { useEffect } from 'react';
import { CategoryFilter, TypeFilter } from '../../../../const';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { typeFilterSetter } from '../../../../store/filters-process/filters-process';
import { getFilters } from '../../../../store/filters-process/selectors';
import { handleFilterInputChange } from '../../../utils/handleFilterInputChange';


export function CameraTypeBlock() {

  const videoCam: HTMLInputElement | null = document.querySelector('input[name="videocamera"]');
  const photoCam: HTMLInputElement | null = document.querySelector('input[name="photocamera"]');
  const {type, category} = useAppSelector(getFilters);
  const dispatch = useAppDispatch();

  useEffect(()=>{
    if(category.includes(CategoryFilter.Video) && (type.includes(TypeFilter.Film) || type.includes(TypeFilter.Instant)) && !category.includes(CategoryFilter.Camera)) {
      const typeFilterArray = type.filter((entry) => entry !== TypeFilter.Film).filter((entry) => entry !== TypeFilter.Instant);
      dispatch(typeFilterSetter(typeFilterArray));
    }
  },[category]);

  return(
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Тип камеры</legend>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox" data-testid='digital-test' name="digital" checked={type.includes(TypeFilter.Digital)} onChange={
            () => handleFilterInputChange(TypeFilter.Digital, type, typeFilterSetter)
          }
          />
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Цифровая</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox" data-testid='film-test' name="film" checked={type.includes(TypeFilter.Film)} disabled={videoCam?.checked && !photoCam?.checked} onChange={
            () => handleFilterInputChange(TypeFilter.Film, type, typeFilterSetter)
          }
          />
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Плёночная</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox" data-testid='snapshot-test' name="snapshot" checked={type.includes(TypeFilter.Instant)} disabled={videoCam?.checked && !photoCam?.checked} onChange={
            () => handleFilterInputChange(TypeFilter.Instant, type, typeFilterSetter)
          }
          />
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Моментальная</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox" data-testid='collection-test' name="collection" checked={type.includes(TypeFilter.Collectible)} onChange={
            () =>handleFilterInputChange(TypeFilter.Collectible, type, typeFilterSetter)
          }
          />
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Коллекционная</span>
        </label>
      </div>
    </fieldset>
  );
}
