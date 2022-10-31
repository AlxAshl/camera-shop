import { renderWithProviders } from '../../../test/utils/render-with-redux';
import PaginationList from './pagination-list';

test('Render PaginationList', () => {
  const { asFragment } = renderWithProviders(<PaginationList/>);
  expect(asFragment()).toMatchSnapshot();
});
