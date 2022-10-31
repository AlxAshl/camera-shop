import { renderWithProviders } from '../../test/utils/render-with-redux';
import NavBar from './nav-bar';

test('Render NavBar', () => {
  const { asFragment } = renderWithProviders(<NavBar/>);
  expect(asFragment()).toMatchSnapshot();
});
