import { AppRoute, TypeFilter } from '../../../../const';
import { productsMock } from '../../../../test/test-mocks';
import { renderWithProviders } from '../../../../test/utils/render-with-redux';
import { screen } from '@testing-library/react';
import { CameraTypeBlock } from './camera-type-block';


describe('Cameratypeblock component', () => {
  test('renders unchecked camtype checkboxes on initial', () => {
    renderWithProviders(<CameraTypeBlock/>,{initialState: { FILTERS: { allProducts: productsMock, extraFilters:{type: [''], category:[]}}} , route: AppRoute.Catalog});
    const digitalCheckbox = screen.getByTestId('digital-test');
    const filmCheckbox = screen.getByTestId('film-test');
    const snapshotCheckbox = screen.getByTestId('snapshot-test');
    const collectionCheckbox = screen.getByTestId('collection-test');

    expect(digitalCheckbox).not.toBeChecked();
    expect(filmCheckbox).not.toBeChecked();
    expect(snapshotCheckbox).not.toBeChecked();
    expect(collectionCheckbox).not.toBeChecked();

  });
  test('renders checked camtype checkboxes from store', () => {
    renderWithProviders(<CameraTypeBlock/>,{initialState: { FILTERS: { allProducts: productsMock, extraFilters:{type: [TypeFilter.Collectible], category:[]}}}});
    const digitalCheckbox = screen.getByTestId('digital-test');
    const collectionCheckbox = screen.getByTestId('collection-test');
    expect(digitalCheckbox).not.toBeChecked();
    expect(collectionCheckbox).toBeChecked();
  });
});
