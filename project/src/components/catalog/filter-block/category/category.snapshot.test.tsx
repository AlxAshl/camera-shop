import { renderWithProviders } from '../../../../test/utils/render-with-redux';
import { Category } from './category';

test('Render Category', () => {
  const { asFragment } = renderWithProviders(<Category />);
  expect(asFragment()).toMatchSnapshot();
});
