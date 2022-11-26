import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { ProductType } from '../../../../types/product';
import useDebounce from '../../../../hooks/use-debounce';
import { getProductsByPrice } from '../../../../store/product-process/selectors';
import { URLParams } from '../../../../const';


export function Price() {

  const [inputValue, setInputValue] = useState({ min: '', max: ''});
  const [searchParams, setSearchParams] = useSearchParams();
  const productsByPrice: ProductType[] = useAppSelector(getProductsByPrice);
  const debouncedMinInput = useDebounce(inputValue.min, 1250);
  const debouncedMaxInput = useDebounce(inputValue.max, 1250);

  useEffect(
    () => {

      if (debouncedMinInput !== '' && productsByPrice) {
        if (Number(debouncedMinInput) < productsByPrice[0].price && inputValue.min !== '') {
          setInputValue((prev) => ({...prev, min: String(productsByPrice[0].price)}));
          searchParams.delete(URLParams.PriceMin);
          searchParams.append(URLParams.PriceMin, String(productsByPrice[0].price));
        }
        else {
          if (Number(debouncedMinInput) > Number(inputValue.max) && inputValue.max !== '') {
            setInputValue((prev) => ({...prev, min: inputValue.max}));
            searchParams.delete(URLParams.PriceMin);
            searchParams.append(URLParams.PriceMin, inputValue.max);
          }
          if(Number(inputValue.min) > productsByPrice[productsByPrice.length - 1].price) {
            setInputValue((prev) => ({...prev, min: String(productsByPrice[productsByPrice.length - 1].price)}));
            searchParams.delete(URLParams.PriceMin);
            searchParams.append(URLParams.PriceMin, String(productsByPrice[productsByPrice.length - 1].price));
          }
          if(!productsByPrice.find((product) => product.price === Number(inputValue.min))) {
            const newPriceInput = productsByPrice.find((product, i) => {
              const prevProduct = productsByPrice[i - 1];
              return prevProduct && (prevProduct.price < Number(inputValue.min)) && (product.price > Number(inputValue.min));
            });
            const newMinPriceInput = newPriceInput?.price;
            setInputValue((prev) => ({...prev, min: String(newMinPriceInput)}));
            searchParams.delete(URLParams.PriceMin);
            searchParams.append(URLParams.PriceMin, String(newMinPriceInput));
          }
        }
      }

      else {
        const priceMinParam = searchParams.get(URLParams.PriceMin) || '';
        if (priceMinParam !== inputValue.min) {
          setInputValue((prev) => ({...prev, min: priceMinParam}));
        }
      }
      setSearchParams(searchParams);
    },
    [debouncedMinInput, searchParams]
  );

  useEffect(
    () => {

      if (debouncedMaxInput !== '' && productsByPrice) {
        if (Number(inputValue.max) > productsByPrice[productsByPrice.length - 1].price && inputValue.max !== '') {
          setInputValue((prev) => ({...prev, max: String(productsByPrice[productsByPrice.length - 1].price)}));
        }
        else {
          if (Number(debouncedMaxInput) < Number(inputValue.min)) {
            setInputValue((prev) => ({...prev, max: inputValue.min}));
            searchParams.delete(URLParams.PriceMax);
            searchParams.append(URLParams.PriceMax, inputValue.min);
          }
          if(productsByPrice[0].price > Number(inputValue.max)) {
            setInputValue((prev) => ({...prev, max: String(productsByPrice[0].price)}));
            searchParams.delete(URLParams.PriceMax);
            searchParams.append(URLParams.PriceMax, String(productsByPrice[0].price));
          }
          if(!productsByPrice.find((product) => product.price === Number(inputValue.max)) && productsByPrice[0].price < Number(inputValue.max)) {
            const newPriceInput = productsByPrice.find((product, i) => {
              const nextProduct = productsByPrice[i + 1];
              return nextProduct && (product.price < Number(inputValue.max)) && (nextProduct.price > Number(inputValue.max));
            });
            const newMaxPriceInput = newPriceInput?.price;
            setInputValue((prev) => ({...prev, max: String(newMaxPriceInput)}));
            searchParams.delete(URLParams.PriceMax);
            searchParams.append(URLParams.PriceMax, String(newMaxPriceInput));
          }
        }
      }

      else {
        const piceMaxParam = searchParams.get(URLParams.PriceMax) || '';
        if (piceMaxParam !== inputValue.max) {
          setInputValue((prev) => ({...prev, max: piceMaxParam}));
        }
      }
      setSearchParams(searchParams);
    },
    [debouncedMaxInput, searchParams]
  );

  return(
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="custom-input">
          <label>
            <input type="number" id='minPrice' value={inputValue.min} name="price" placeholder={productsByPrice[0] ? productsByPrice[0].price?.toString() : 'от'} onChange={(evt) => setInputValue((prev) => ({...prev, min: evt.target.value}))}/>
          </label>
        </div>
        <div className="custom-input">
          <label>
            <input type="number" id='maxPrice' value={inputValue.max} name="priceUp" placeholder={productsByPrice[0] ? productsByPrice[productsByPrice.length - 1].price?.toString() : 'до'} onChange={(evt) => setInputValue((prev) => ({...prev, max: evt.target.value}))}/>
          </label>
        </div>
      </div>
    </fieldset>
  );
}

