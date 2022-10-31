import { renderWithProviders } from '../../test/utils/render-with-redux';
import BasketSummary from './basket-summary';

test('Render BasketSummary', () => {
  const { asFragment } = renderWithProviders(<BasketSummary/>);
  expect(asFragment()).toMatchSnapshot();
});
