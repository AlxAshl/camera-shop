import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils/render-with-redux';
import ProductPage from './product-page';
import * as Hooks from '../../hooks/useAppSelector';
import { productMock } from '../../test/test-mocks';
import { AppRoute } from '../../const';

jest.mock('../../hooks/useAppSelector');
const spySelect = jest.spyOn(Hooks, 'useAppSelector');
const mockDispatch = jest.fn();
jest.mock('../../hooks/useAppDispatch', () => ({
  useAppDispatch: () => mockDispatch
}));
describe('Product-page component', () => {
  beforeEach(() => {
    spySelect.mockReturnValue([productMock]);
  });
  test('Displays error in case of incorrect page url input', () => {
    renderWithProviders(<ProductPage />, { route: `${AppRoute.Product}/page_666` });
  });
  setTimeout(()=>{
    const message = screen.getByTestId('error-test');
    expect(message).toBeInTheDocument();
  },1000);
});
