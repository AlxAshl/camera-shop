import { AppRoute } from '../../const';
import { renderWithProviders } from '../../test/utils/render-with-redux';
import NavBar from './nav-bar';
import { screen } from '@testing-library/react';

describe('NavBar component', () => {
  test('renders links correctly', () => {
    renderWithProviders(<NavBar/>,);
    const catalogLink = screen.getByText('Каталог');
    expect(catalogLink).toHaveAttribute('href', `${AppRoute.Catalog}`);
  });
});
