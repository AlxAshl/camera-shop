import { screen } from '@testing-library/react';
import { AppRoute } from '../../const';
import { renderWithProviders } from '../../test/utils/render-with-redux';
import Breadcrumbs from './breadcrumbs';
describe('Breadcrumbs component', () => {
  test('renders links correctly when on mainpage', ()=> {
    renderWithProviders(<Breadcrumbs/>, {route: AppRoute.Catalog});
    const catalogLink = screen.getAllByText('Каталог');
    const mainpageLink = screen.getByText('Главная');
    const crumbItem = screen.queryByTestId('breadcrumbs__item-test');
    expect(catalogLink.length).toBe(1);
    expect(mainpageLink).toBeInTheDocument();
    expect(crumbItem).not.toBeInTheDocument();
  });
  test('renders links correctly when on productpage', ()=> {
    renderWithProviders(<Breadcrumbs />, {route: `${AppRoute.Catalog}${AppRoute.Product}/17`});
    const catalogLink = screen.getAllByText('Каталог');
    const mainpageLink = screen.getByText('Главная');
    const crumbItem = screen.queryByTestId('breadcrumbs__item-test');
    expect(catalogLink.length).toBe(2);
    expect(mainpageLink).toBeInTheDocument();
    expect(crumbItem).toBeInTheDocument();
  });
});
