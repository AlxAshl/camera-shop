import { AppRoute } from '../../../../const';
import { productsMock } from '../../../../test/test-mocks';
import { renderWithProviders } from '../../../../test/utils/render-with-redux';
import { screen } from '@testing-library/react';
import { Category } from './category';


describe('Category component', () => {
  test('renders unchecked category checkboxes on initial', () => {
    renderWithProviders(<Category/>,{initialState: { FILTERS: { allProducts: productsMock}} , route: AppRoute.Catalog});
    const photocamCheckbox = screen.getByTestId('photocamera-test');
    const videocamCheckbox = screen.getByTestId('videocamera-test');

    expect(photocamCheckbox).not.toBeChecked();
    expect(videocamCheckbox).not.toBeChecked();

  });
  test('renders checked category checkboxes if from url', () => {
    renderWithProviders(<Category/>,{initialState: { FILTERS: { allProducts: productsMock}} , route: `${AppRoute.Catalog}?level=Нулевой&category=Видеокамера`});
    const photocamCheckbox = screen.getByTestId('photocamera-test');
    const videocamCheckbox = screen.getByTestId('videocamera-test');
    expect(photocamCheckbox).not.toBeChecked();
    expect(videocamCheckbox).toBeChecked();
  });
});
