import { renderWithProviders } from '../../../../test/utils/render-with-redux';
import { PriceBlock } from './price-block';

test('Render Price', () => {
  const { asFragment } = renderWithProviders(<PriceBlock />);
  expect(asFragment()).toMatchSnapshot();
});
