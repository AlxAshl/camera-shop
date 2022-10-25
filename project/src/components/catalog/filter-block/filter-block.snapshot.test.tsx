import { renderWithProviders } from '../../../test/utils/render-with-redux';
import FilterBlock from './filter-block';


test('FilterBlock renders correctly', () => {
  const { asFragment } = renderWithProviders(<FilterBlock/>);
  expect(asFragment()).toMatchSnapshot();
});

