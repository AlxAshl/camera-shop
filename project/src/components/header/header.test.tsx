import { screen } from '@testing-library/react';
import { basketProductsMock } from '../../test/test-mocks';
import { renderWithProviders } from '../../test/utils/render-with-redux';
import Header from './header';


describe('Header component', () => {
  test('Header renders correctly with basket items added', () => {
    renderWithProviders(<Header />, {initialState: { BASKET: { basketProducts: basketProductsMock}}});
    expect(screen.getByTestId('header-quantity-test')).toBeInTheDocument();
    expect(screen.getByTestId('header-quantity-test')).toHaveTextContent('3');
  });
  test('Header renders correctly without basket items', () => {
    renderWithProviders(<Header />, {initialState: { BASKET: { basketProducts: []}}});
    expect(screen.queryByTestId('header-quantity-test')).not.toBeInTheDocument();
  });

});
