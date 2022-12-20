import { AppRoute, LevelFilter } from '../../../../const';
import { renderWithProviders } from '../../../../test/utils/render-with-redux';
import { screen } from '@testing-library/react';
import { LevelBlock } from './level-block';


describe('LevelBlock component', () => {
  test('renders unchecked level checkboxes on initial', () => {
    renderWithProviders(<LevelBlock/>,{initialState: { FILTERS: { extraFilters:{level: []}}} , route: AppRoute.Catalog});
    const zeroLevelCheckBox = screen.getByTestId('level-zero-test');
    const amateurLevelCheckbox = screen.getByTestId('level-amateur-test');
    const proLevelCheckbox = screen.getByTestId('level-pro-test');
    expect(zeroLevelCheckBox).not.toBeChecked();
    expect(amateurLevelCheckbox).not.toBeChecked();
    expect(proLevelCheckbox).not.toBeChecked();
  });
  test('renders checked level checkboxes from store', () => {
    renderWithProviders(<LevelBlock/>,{initialState: { FILTERS: { extraFilters:{level: [LevelFilter.Pro]}}}});
    const zeroLevelCheckBox = screen.getByTestId('level-zero-test');
    const amateurLevelCheckbox = screen.getByTestId('level-amateur-test');
    const proLevelCheckbox = screen.getByTestId('level-pro-test');
    expect(zeroLevelCheckBox).not.toBeChecked();
    expect(amateurLevelCheckbox).not.toBeChecked();
    expect(proLevelCheckbox).toBeChecked();
  });
});
