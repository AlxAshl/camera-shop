import { renderWithProviders } from '../../test/utils/render-with-redux';

import Preloader from './preloader';

test('FilterBlock renders correctly', () => {
  const { asFragment } = renderWithProviders(<Preloader/>);
  expect(asFragment()).toMatchSnapshot();
});
