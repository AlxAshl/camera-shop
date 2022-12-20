import { AppRoute } from '../../const';
import { basketProductsMock, productsMock } from '../../test/test-mocks';
import { PriceBlock } from '../catalog/filter-block/price/price-block';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils/render-with-redux';


const mockDispatch = jest.fn();
jest.mock('../../hooks/useAppDispatch', () => ({
  useAppDispatch: () => mockDispatch
}));

describe('processPriceInput component', () => {
  test('corrects value after input', () => {
    renderWithProviders(<PriceBlock/>,{initialState: { FILTERS: {allProducts: basketProductsMock,filteredProducts:productsMock, extraFilters:{minprice:[], maxprice:[]}}, PRODUCT:{products: productsMock}}, route: `${AppRoute.Catalog}` });
    const minPriceInput = screen.getByTestId('minPrice-test');
    fireEvent.focus(minPriceInput);
    fireEvent.input(minPriceInput, { target: { value: '1'}});
    fireEvent.keyPress(minPriceInput, {key: 'Enter', code: 'Enter', charCode: 13});
    setTimeout(()=> {
      expect(minPriceInput).toHaveDisplayValue(String(productsMock[1].price));
    },100);
  });
});
