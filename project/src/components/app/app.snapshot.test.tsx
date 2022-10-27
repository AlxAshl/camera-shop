import { renderWithProviders } from '../../test/utils/render-with-redux';
import App from './app';

jest.mock('./app', () => 'RouterProvider');
test('Render App', () => {
  const { asFragment } = renderWithProviders(<App/>);
  expect(asFragment()).toMatchSnapshot();
});
