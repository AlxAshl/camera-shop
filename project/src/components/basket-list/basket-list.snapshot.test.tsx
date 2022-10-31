import { renderWithProviders } from '../../test/utils/render-with-redux';
import BasketList from './basket-list';

test('Render BasketList', () => {
  const { asFragment } = renderWithProviders(<BasketList/>);
  expect(asFragment()).toMatchSnapshot();
});
