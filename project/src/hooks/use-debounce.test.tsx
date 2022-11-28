import { renderWithProviders } from '../test/utils/render-with-redux';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { Price } from '../components/catalog/filter-block/price/price';
import { productsMock } from '../test/test-mocks';
import { AppRoute } from '../const';

describe('useDebounce  hook', () => {
  test('debounces input', async () => {
    renderWithProviders(<Price />, {initialState: { FILTERS: { allProducts: productsMock}} , route: AppRoute.Catalog});
    const minPriceInput = screen.getByTestId('minPrice-test');
    fireEvent.focus(minPriceInput);
    fireEvent.input(minPriceInput, { target: { value: '1'}});
    await (waitFor(() => expect(minPriceInput).not.toHaveDisplayValue('16000'),{timeout:100}));
    await (waitFor(() => expect(minPriceInput).not.toHaveDisplayValue('16000'),{timeout:500}));
    await (waitFor(() => expect(minPriceInput).not.toHaveDisplayValue('16000'),{timeout:1000}));
    await (waitFor(() => expect(minPriceInput).toHaveDisplayValue('16000'),{timeout:1500}));
  });
});
