import { renderWithProviders } from '../../test/utils/render-with-redux';
import NotFound from './not-found';

test('Not-found renders correctly', () => {
  const { asFragment } = renderWithProviders(<NotFound/>);
  expect(asFragment).toMatchSnapshot();
});
