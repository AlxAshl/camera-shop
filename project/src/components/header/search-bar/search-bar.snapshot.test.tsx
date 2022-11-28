
import { renderWithProviders } from '../../../test/utils/render-with-redux';
import SearchBar from './search-bar';

test('Render SearchBar', () => {
  const { asFragment } = renderWithProviders(<SearchBar />);
  expect(asFragment()).toMatchSnapshot();
});
