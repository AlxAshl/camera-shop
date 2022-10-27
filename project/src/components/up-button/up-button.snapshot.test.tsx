import { renderWithProviders } from '../../test/utils/render-with-redux';
import UpButton from './up-button';

test('Up-Button renders correctly', () => {
  const { asFragment } = renderWithProviders(<UpButton/>);
  expect(asFragment).toMatchSnapshot();
});
