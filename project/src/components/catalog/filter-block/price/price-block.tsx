import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { getFilters, getProductsByPrice, getProductsByPriceDesc } from '../../../../store/filters-process/selectors';
import useInputEventListener from '../../../../hooks/use-input-event-listener';
import { maxPriceFilterSetter, minPriceFilterSetter } from '../../../../store/filters-process/filters-process';
import { useSelector } from 'react-redux';
import { setMaxInput, setMinInput } from '../../../utils/processPriceInput';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';


export function PriceBlock() {

  const [inputValue, setInputValue] = useState({ min: '', max: ''});
  const [isInitial, setIsInitial] = useState(true);
  const productsByPriceAsc = useAppSelector(getProductsByPrice);
  const productsByPriceDesc = useAppSelector(getProductsByPriceDesc);
  const {PriceMax, PriceMin} = useSelector(getFilters);
  const dispatch = useAppDispatch();
  const minPriceFiled = document.querySelector('#minPrice');
  const maxPriceFiled = document.querySelector('#maxPrice');
  const returnMinInput = useInputEventListener(minPriceFiled as HTMLInputElement, minPriceFilterSetter);
  const returnMaxInput = useInputEventListener(maxPriceFiled as HTMLInputElement, maxPriceFilterSetter);

  useEffect(
    () => {
      (Number(returnMinInput) > Number(inputValue.max) && inputValue.max !== '') && !isInitial
        ? dispatch(minPriceFilterSetter([inputValue.max]))
        : setMinInput(returnMinInput, productsByPriceDesc, minPriceFilterSetter);
    },
    [returnMinInput]
  );
  useEffect(
    () => {
      Number(returnMaxInput) < Number(inputValue.min) && !isInitial
        ? dispatch(maxPriceFilterSetter([inputValue.min]))
        : setMaxInput(returnMaxInput, productsByPriceAsc, maxPriceFilterSetter);
    },
    [returnMaxInput]
  );

  useEffect(()=> {
    if(PriceMax) {
      setInputValue((prev) => ({...prev, max: String(PriceMax)}));
    }
    if(PriceMin) {
      setInputValue((prev) => ({...prev, min: String(PriceMin)}));
    }
    setIsInitial(false);
  },[isInitial, PriceMax, PriceMin]);

  return(
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="custom-input">
          <label>
            <input type="number" data-testid='minPrice-test' id='minPrice' value={inputValue.min} name="price" placeholder={productsByPriceAsc[0] ? productsByPriceAsc[0].price?.toString() : 'от'} onChange={(evt) => setInputValue((prev) => ({...prev, min: evt.target.value}))}/>
          </label>
        </div>
        <div className="custom-input">
          <label>
            <input type="number" data-testid='maxPrice-test' id='maxPrice' value={inputValue.max} name="priceUp" placeholder={productsByPriceAsc[0] ? productsByPriceAsc[productsByPriceAsc.length - 1].price?.toString() : 'до'} onChange={(evt) => setInputValue((prev) => ({...prev, max: evt.target.value}))}/>
          </label>
        </div>
      </div>
    </fieldset>
  );
}

