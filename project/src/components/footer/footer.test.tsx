import { renderWithProviders } from '../../test/utils/render-with-redux';
import Footer from './footer';
import { screen } from '@testing-library/react';
import { AppRoute } from '../../const';

describe('Footer component', () => {
  test('renders links correctly', () => {
    renderWithProviders(<Footer/>,);
    const catalogLink = screen.getByText('Каталог');
    const logoLink = screen.getByTestId('logo-test');
    expect(catalogLink).toHaveAttribute('href', `${AppRoute.Catalog}`);
    expect(logoLink).toHaveAttribute('href', `${AppRoute.Root}`);
  });
});
