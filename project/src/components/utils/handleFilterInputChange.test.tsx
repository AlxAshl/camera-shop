import { AppRoute } from '../../const';
import { productsMock } from '../../test/test-mocks';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils/render-with-redux';
import Catalog from '../catalog/catalog';


const mockDispatch = jest.fn();
jest.mock('../../hooks/useAppDispatch', () => ({
  useAppDispatch: () => mockDispatch
}));

describe('handleFilterInputChange component', () => {
  test('dispatches action after checkbox click', () => {
    renderWithProviders(<Catalog/>, {initialState: { PRODUCT: {products: productsMock, isProductsDataLoaded: true}}, route: `${AppRoute.Catalog}`});
    const zeroLevelCheckbox = screen.getByTestId('level-zero-test');
    fireEvent.change(zeroLevelCheckbox);
    setTimeout(()=>{
      expect(mockDispatch).toHaveBeenCalledTimes(1);
    },100);
  });
});

