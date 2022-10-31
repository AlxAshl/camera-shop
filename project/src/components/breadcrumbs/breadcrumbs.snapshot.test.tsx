import { renderWithProviders } from '../../test/utils/render-with-redux';
import Breadcrumbs from './breadcrumbs';

test('Render Breadcrumbs', () => {
  const { asFragment } = renderWithProviders(<Breadcrumbs />);
  expect(asFragment()).toMatchSnapshot();
});
