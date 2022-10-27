import { renderWithProviders } from '../../test/utils/render-with-redux';
import Root from './root';

test('Root renders correctly', () => {
  const { asFragment } = renderWithProviders(<Root/>);
  expect(asFragment).toMatchSnapshot();
});
