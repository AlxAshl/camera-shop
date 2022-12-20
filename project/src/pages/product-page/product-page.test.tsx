import { screen } from '@testing-library/react';
import { AppRoute } from '../../const';
import * as Hooks from '../../hooks/useAppSelector';
import { productMock } from '../../test/test-mocks';
import { renderWithProviders } from '../../test/utils/render-with-redux';
import ProductPage from './product-page';


jest.mock('../../hooks/useAppSelector');
const spySelect = jest.spyOn(Hooks, 'useAppSelector');
const mockDispatch = jest.fn();
jest.mock('../../hooks/useAppDispatch', () => ({
  useAppDispatch: () => mockDispatch
}));
jest.mock('../../components/basket-item/basket-item', () => () => {(<div>BasketItem</div>);});
describe('Product-page component', () => {
  beforeEach(() => {
    spySelect.mockReturnValue([productMock]);
  });
  test('Displays error in case of incorrect page url input', () => {
    renderWithProviders(<ProductPage />, { initialState: { BASKET: {showRemoveProduct:false, showCart: false}}, route: `${AppRoute.Product}/page_666` });
    setTimeout(()=>{
      const message = screen.getByTestId('error-test');
      expect(message).toBeInTheDocument();
    },1000);
  });

});
