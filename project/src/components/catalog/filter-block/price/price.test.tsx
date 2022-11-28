import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../../../test/utils/render-with-redux';
import { AppRoute } from '../../../../const';
import { Price } from './price';
import { productsMock } from '../../../../test/test-mocks';

describe('Price component', () => {
  test('renders price inputs with no values and with placeholders', () => {
    renderWithProviders(<Price/>,{initialState: { FILTERS: { allProducts: productsMock}} , route: AppRoute.Catalog});
    const minPriceInputByPlaceholder = screen.getByPlaceholderText('16000');
    const maxPriceInputByPlaceholder = screen.getByPlaceholderText('160250');
    expect(minPriceInputByPlaceholder).toBeInTheDocument();
    expect(maxPriceInputByPlaceholder).toBeInTheDocument();
    expect(minPriceInputByPlaceholder).toHaveDisplayValue('');
    expect(maxPriceInputByPlaceholder).toHaveDisplayValue('');
  });
  test('corrects price inputs with to match available products', async () => {
    renderWithProviders(<Price/>,{initialState: { FILTERS: { allProducts: productsMock}} , route: AppRoute.Catalog});
    const minPriceInput = screen.getByTestId('minPrice-test');
    fireEvent.focus(minPriceInput);
    fireEvent.input(minPriceInput, { target: { value: '1'}});
    await (waitFor(() => expect(minPriceInput).toHaveDisplayValue('16000'),{timeout:1500}));
  });
  test('corrects price inputs not to contradict each other', async () => {
    renderWithProviders(<Price/>,{initialState: { FILTERS: { allProducts: productsMock}} , route: AppRoute.Catalog});
    const minPriceInput = screen.getByTestId('minPrice-test');
    const maxPriceInput = screen.getByTestId('maxPrice-test');
    fireEvent.focus(maxPriceInput);
    fireEvent.input(maxPriceInput, { target: { value: '126000'}});
    fireEvent.focus(minPriceInput);
    fireEvent.input(minPriceInput, { target: { value: '160200'}});
    await (waitFor(() => expect(minPriceInput).toHaveDisplayValue('126000'),{timeout:1500}));
  });
  test('corrects minprice input to be limited to the highest price available', async () => {
    renderWithProviders(<Price/>,{initialState: { FILTERS: { allProducts: productsMock}} , route: AppRoute.Catalog});
    const minPriceInput = screen.getByTestId('minPrice-test');
    fireEvent.focus(minPriceInput);
    fireEvent.input(minPriceInput, { target: { value: '160300'}});
    await (waitFor(() => expect(minPriceInput).toHaveDisplayValue('160250'),{timeout:1500}));
  });
  test('corrects input from url', () => {
    renderWithProviders(<Price/>,{initialState: { FILTERS: { allProducts: productsMock}} , route: `${AppRoute.Catalog}?price_lte=8430`});
    const maxPriceInput = screen.getByTestId('maxPrice-test');
    expect(maxPriceInput).toHaveDisplayValue('8430');
  });
});
