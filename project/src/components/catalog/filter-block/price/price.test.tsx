import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../../test/utils/render-with-redux';
import { AppRoute } from '../../../../const';
import { PriceBlock } from './price-block';
import { productsMock } from '../../../../test/test-mocks';
import {} from '../../../../hooks/use-price-input-event-listener';

describe('Price component', () => {
  test('renders price inputs with no values and with placeholders', () => {
    renderWithProviders(<PriceBlock/>,{initialState: {PRODUCT: {products: productsMock}, FILTERS: { allProducts: productsMock, filteredProducts:productsMock, extraFilters:{maxprice: [], minprice: []}}} , route: `${AppRoute.Catalog}/page_1`});
    const minPriceInputByPlaceholder = screen.getByPlaceholderText('16000');
    const maxPriceInputByPlaceholder = screen.getByPlaceholderText('160250');
    expect(minPriceInputByPlaceholder).toBeInTheDocument();
    expect(maxPriceInputByPlaceholder).toBeInTheDocument();
    expect(minPriceInputByPlaceholder).toHaveDisplayValue('');
    expect(maxPriceInputByPlaceholder).toHaveDisplayValue('');
  });
});
