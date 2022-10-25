import CardsList from './cards-list';
import { productsMock } from '../../test/test-mocks';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils/render-with-redux';

describe('CardsList component', () => {
  test('renders correct title', () => {
    renderWithProviders(<CardsList products={productsMock}/>);
    const productCards = screen.getAllByTestId('product-card-test');
    expect(productCards).toHaveLength(4);
  });
});
