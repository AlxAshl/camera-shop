import { AppRoute } from '../../const';
import { productsMock } from '../../test/test-mocks';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils/render-with-redux';
import { PriceBlock } from '../catalog/filter-block/price/price-block';


const mockDispatch = jest.fn();
jest.mock('../../hooks/useAppDispatch', () => ({
  useAppDispatch: () => mockDispatch
}));

describe('processPriceInput component', () => {
  test('corrects value after input', () => {
    renderWithProviders(<PriceBlock/>,{initialState: { FILTERS: {allProducts: productsMock, extraFilters: {PriceMin: [], PriceMax: []}}} , route: AppRoute.Catalog});
    const minPriceInput = screen.getByTestId('minPrice-test');
    fireEvent.focus(minPriceInput);
    fireEvent.input(minPriceInput, { target: { value: '1'}});
    fireEvent.keyPress(minPriceInput, {key: 'Enter', code: 'Enter', charCode: 13});
    setTimeout(()=> {
      expect(minPriceInput).toHaveDisplayValue(String(productsMock[1].price));
    },100);
  });
});
