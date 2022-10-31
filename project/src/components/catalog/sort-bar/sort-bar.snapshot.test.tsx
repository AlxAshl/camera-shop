import { renderWithProviders } from '../../../test/utils/render-with-redux';
import SortBar from './sort-bar';


test('SortBar renders correctly', () => {
  const { asFragment } = renderWithProviders(<SortBar/>);
  expect(asFragment()).toMatchSnapshot();
});
