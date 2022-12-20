import { AppRoute, CategoryFilter } from '../../../../const';
import { renderWithProviders } from '../../../../test/utils/render-with-redux';
import { screen } from '@testing-library/react';
import { CategoryBlock } from './category-block';


describe('CategoryBlock component', () => {
  test('renders unchecked camtype checkboxes on initial', () => {
    renderWithProviders(<CategoryBlock/>,{initialState: { FILTERS: { extraFilters:{category: []}}} , route: AppRoute.Catalog});
    const photoCamCheckBox = screen.getByTestId('photocamera-test');
    const videoCamCheckbox = screen.getByTestId('videocamera-test');

    expect(photoCamCheckBox).not.toBeChecked();
    expect(videoCamCheckbox).not.toBeChecked();

  });
  test('renders checked camtype checkboxes from store', () => {
    renderWithProviders(<CategoryBlock/>,{initialState: { FILTERS: { extraFilters:{category: [CategoryFilter.Camera]}}}});
    const photoCamCheckBox = screen.getByTestId('photocamera-test');
    const videoCamCheckbox = screen.getByTestId('videocamera-test');
    expect(videoCamCheckbox).not.toBeChecked();
    expect(photoCamCheckBox).toBeChecked();
  });
});
