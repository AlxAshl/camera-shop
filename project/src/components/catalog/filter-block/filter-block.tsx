import { CameraType } from './camera-type/camera-type';
import { Category } from './category/category';
import { Level } from './level/level';
import { Price } from './price/price';

function FilterBlock(): JSX.Element {
  return (
    <div className="catalog__aside">
      <div className="catalog-filter">
        <form action="#">
          <h2 className="visually-hidden">Фильтр</h2>
          <Price />
          <Category/>
          <CameraType/>
          <Level/>
          <button className="btn catalog-filter__reset-btn" type="reset">Сбросить фильтры
          </button>
        </form>
      </div>
    </div>
  );
}

export default FilterBlock;
