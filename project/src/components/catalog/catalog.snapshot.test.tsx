import { renderWithProviders } from '../../test/utils/render-with-redux';
import Catalog from './catalog';

test('Render Cataog', () => {
  const { asFragment } = renderWithProviders(<Catalog/>);
  expect(asFragment()).toMatchSnapshot();
});
