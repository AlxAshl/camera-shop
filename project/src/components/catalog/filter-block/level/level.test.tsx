import { AppRoute } from '../../../../const';
import { productsMock } from '../../../../test/test-mocks';
import { renderWithProviders } from '../../../../test/utils/render-with-redux';
import { Level } from './level';
import { screen } from '@testing-library/react';


describe('Level component', () => {
  test('renders unchecked level checkboxes on initial', () => {
    renderWithProviders(<Level/>,{initialState: { FILTERS: { allProducts: productsMock}} , route: AppRoute.Catalog});
    const zeroLevelCheckbox = screen.getByTestId('level-zero-test');
    const amateurLevelCheckbox = screen.getByTestId('level-amateur-test');
    const proLevelCheckbox = screen.getByTestId('level-pro-test');
    expect(zeroLevelCheckbox).not.toBeChecked();
    expect(amateurLevelCheckbox).not.toBeChecked();
    expect(proLevelCheckbox).not.toBeChecked();
  });
  test('renders checked level checkboxes if from url', () => {
    renderWithProviders(<Level/>,{initialState: { FILTERS: { allProducts: productsMock}} , route: `${AppRoute.Catalog}?price_lte=8000&level=Любительский`});
    const zeroLevelCheckbox = screen.getByTestId('level-zero-test');
    const amateurLevelCheckbox = screen.getByTestId('level-amateur-test');
    expect(zeroLevelCheckbox).not.toBeChecked();
    expect(amateurLevelCheckbox).toBeChecked();
  });
});
