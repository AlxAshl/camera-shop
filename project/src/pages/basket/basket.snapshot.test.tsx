import { renderWithProviders } from '../../test/utils/render-with-redux';
import Basket from './basket';

test('Basket renders correctly', () => {
  const { asFragment } = renderWithProviders(<Basket/>);
  expect(asFragment).toMatchSnapshot();
});
