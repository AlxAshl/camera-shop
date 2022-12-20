import { renderWithProviders } from '../../test/utils/render-with-redux';
import MainPage from './main-page';
import * as router from 'react-router';
import { AppRoute } from '../../const';

const mockNavigate = jest.fn();
jest.mock('../../components/basket-item/basket-item', () => () => {(<div>BasketItem</div>);});

describe('Main-page component', () => {
  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => mockNavigate);
  });
  test('Navigate triggers on incorrect page url', () => {
    renderWithProviders(<MainPage />,{route: `${AppRoute.Product}/page_666` });
    setTimeout(()=>{
      expect(mockNavigate).toBeCalled();
    },1000);
  });

});
