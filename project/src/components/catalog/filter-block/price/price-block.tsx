import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { getFilters, getProductsByPriceAsc, getProductsByPriceDesc } from '../../../../store/filters-process/selectors';
import useInputEventListener from '../../../../hooks/use-input-event-listener';
import { maxPriceFilterSetter, minPriceFilterSetter } from '../../../../store/filters-process/filters-process';
import { useSelector } from 'react-redux';
import { setMaxInput, setMinInput } from '../../../utils/processPriceInput';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';


export function PriceBlock() {

  const [inputValue, setInputValue] = useState({ min: '', max: ''});
  const [isInitial, setIsInitial] = useState(true);
  const productsByPriceAsc = useAppSelector(getProductsByPriceAsc);
  const productsByPriceDesc = useAppSelector(getProductsByPriceDesc);
  const {maxprice, minprice} = useSelector(getFilters);
  const dispatch = useAppDispatch();
  const minPriceFiledRef = useRef() as MutableRefObject<HTMLInputElement>;
  const maxPriceFiledRef = useRef() as MutableRefObject<HTMLInputElement>;
  const returnMinInput = useInputEventListener(minPriceFiledRef, minPriceFilterSetter);
  const returnMaxInput = useInputEventListener(maxPriceFiledRef, maxPriceFilterSetter);

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

  useEffect(()=>{
    if((Number(inputValue.min) < productsByPriceAsc[0]?.price) && inputValue.min !== '' && productsByPriceAsc.length > 0) {
      dispatch(minPriceFilterSetter([String(productsByPriceAsc[0].price)]));
    }
    if((Number(inputValue.max) > productsByPriceAsc[productsByPriceAsc.length - 1]?.price) && inputValue.max !== '' && productsByPriceDesc.length > 0) {
      dispatch(maxPriceFilterSetter([String(productsByPriceAsc[productsByPriceAsc.length - 1].price)]));
    }
  },[productsByPriceAsc, productsByPriceDesc]);

  useEffect(()=> {
    if(maxprice) {
      setInputValue((prev) => ({...prev, max: String(maxprice)}));
    }
    if(minprice) {
      setInputValue((prev) => ({...prev, min: String(minprice)}));
    }
    setIsInitial(false);
  },[isInitial, maxprice, minprice]);

  return(
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="custom-input">
          <label>
            <input ref={minPriceFiledRef} type="number" data-testid='minPrice-test' id='minPrice' value={inputValue.min} name="price" placeholder={productsByPriceAsc[0] ? productsByPriceAsc[0].price?.toString() : 'от'} onChange={(evt) => setInputValue((prev) => ({...prev, min: evt.target.value}))}/>
          </label>
        </div>
        <div className="custom-input">
          <label>
            <input ref={maxPriceFiledRef} type="number" data-testid='maxPrice-test' id='maxPrice' value={inputValue.max} name="priceUp" placeholder={productsByPriceAsc[0] ? productsByPriceAsc[productsByPriceAsc.length - 1].price?.toString() : 'до'} onChange={(evt) => setInputValue((prev) => ({...prev, max: evt.target.value}))}/>
          </label>
        </div>
      </div>
    </fieldset>
  );
}

