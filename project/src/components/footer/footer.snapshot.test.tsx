import { renderWithProviders } from '../../test/utils/render-with-redux';
import Footer from './footer';

test('Render Footer', () => {
  const { asFragment } = renderWithProviders(<Footer/>);
  expect(asFragment()).toMatchSnapshot();
});
