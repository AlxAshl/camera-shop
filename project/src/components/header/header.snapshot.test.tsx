import { renderWithProviders } from '../../test/utils/render-with-redux';
import Header from './header';

test('FilterBlock renders correctly', () => {
  const { asFragment } = renderWithProviders(<Header/>);
  expect(asFragment()).toMatchSnapshot();
});
