import { renderWithProviders } from '../../test/utils/render-with-redux';
import * as Hooks from '../../hooks/useAppSelector';
import { productMock } from '../../test/test-mocks';
import { AppRoute } from '../../const';
import MainPage from './main-page';
import * as router from 'react-router';

const navigate = jest.fn();
jest.mock('../../hooks/useAppSelector');
const spySelect = jest.spyOn(Hooks, 'useAppSelector');
const mockDispatch = jest.fn();
jest.mock('../../hooks/useAppDispatch', () => ({
  useAppDispatch: () => mockDispatch
}));


describe('Main-page component', () => {
  beforeEach(() => {
    spySelect.mockReturnValue([productMock]);
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
  });
  test('Navigate triggers on incorrect page url', () => {
    renderWithProviders(<MainPage />, { route: `${AppRoute.Product}/page_666` });
  });
  setTimeout(()=>{
    expect(navigate).toBeCalled();
  },1000);
});
