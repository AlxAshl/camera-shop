import { renderWithProviders } from '../../../../test/utils/render-with-redux';
import { Price } from './price';

test('Render Price', () => {
  const { asFragment } = renderWithProviders(<Price />);
  expect(asFragment()).toMatchSnapshot();
});
