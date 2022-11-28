import { AppRoute } from '../../../../const';
import { productsMock } from '../../../../test/test-mocks';
import { renderWithProviders } from '../../../../test/utils/render-with-redux';
import { screen } from '@testing-library/react';
import { CameraType } from './camera-type';


describe('Cameratype component', () => {
  test('renders unchecked camtype checkboxes on initial', () => {
    renderWithProviders(<CameraType/>,{initialState: { FILTERS: { allProducts: productsMock}} , route: AppRoute.Catalog});
    const digitalCheckbox = screen.getByTestId('digital-test');
    const filmCheckbox = screen.getByTestId('film-test');
    const snapshotCheckbox = screen.getByTestId('snapshot-test');
    const collectionCheckbox = screen.getByTestId('collection-test');

    expect(digitalCheckbox).not.toBeChecked();
    expect(filmCheckbox).not.toBeChecked();
    expect(snapshotCheckbox).not.toBeChecked();
    expect(collectionCheckbox).not.toBeChecked();

  });
  test('renders checked camtype checkboxes if from url', () => {
    renderWithProviders(<CameraType/>,{initialState: { FILTERS: { allProducts: productsMock}} , route: `${AppRoute.Catalog}?level=Нулевой&category=Видеокамера&type=Коллекционная`});
    const digitalCheckbox = screen.getByTestId('digital-test');
    const collectionCheckbox = screen.getByTestId('collection-test');
    expect(digitalCheckbox).not.toBeChecked();
    expect(collectionCheckbox).toBeChecked();
  });
});
