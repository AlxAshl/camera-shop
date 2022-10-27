import { renderWithProviders } from '../../test/utils/render-with-redux';
import SVGRoot from './svg-root';

test('SVG renders correctly', () => {
  const { asFragment } = renderWithProviders(<SVGRoot/>);
  expect(asFragment).toMatchSnapshot();
});
