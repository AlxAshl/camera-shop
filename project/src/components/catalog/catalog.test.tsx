import { productsMock } from '../../test/test-mocks';
import { renderWithProviders } from '../../test/utils/render-with-redux';
import { screen } from '@testing-library/react';
import Catalog from './catalog';
import axios from 'axios';

describe('Catalog component', () => {
  beforeEach(() => {
    axios.get = jest.fn().mockResolvedValue({});
  });
  test('renders products after fetching data and state change', async () => {
    renderWithProviders(<Catalog/>, {initialState: { PRODUCT: { products: productsMock, isProductsDataLoaded: true}}});
    const product = await screen.findAllByTestId('product-card-test');
    expect(product[0]).toBeInTheDocument();
  });
});


