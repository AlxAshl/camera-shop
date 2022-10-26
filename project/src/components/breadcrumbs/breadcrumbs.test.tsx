import { screen } from '@testing-library/react';
import { AppRoute } from '../../const';
import { productMock } from '../../test/test-mocks';
import { renderWithProviders } from '../../test/utils/render-with-redux';
import Breadcrumbs from './breadcrumbs';
describe('Breadcrumbs component', () => {
  test('renders links correctly when on mainpage', ()=> {
    renderWithProviders(<Breadcrumbs/>, {route: AppRoute.Catalog});
    const catalogLink = screen.getByText('Каталог');
    const mainpageLink = screen.getByText('Главная');
    const crumbItem = screen.queryByTestId('breadcrumbs__item-test');
    expect(catalogLink).toBeInTheDocument();
    expect(mainpageLink).toBeInTheDocument();
    expect(crumbItem).not.toBeInTheDocument();
  });
  test('renders links correctly when on productpage', ()=> {
    renderWithProviders(<Breadcrumbs camera={productMock}/>, {route: `${AppRoute.Catalog}${AppRoute.Product}/17`});
    const catalogLink = screen.getByText('Каталог');
    const mainpageLink = screen.getByText('Главная');
    const crumbItem = screen.queryByTestId('breadcrumbs__item-test');
    expect(catalogLink).toBeInTheDocument();
    expect(mainpageLink).toBeInTheDocument();
    expect(crumbItem).toBeInTheDocument();
    expect(crumbItem).toHaveTextContent('Look Identify');
  });
});
