import { renderWithProviders } from '../../../../test/utils/render-with-redux';
import { CameraType } from './camera-type';

test('Render CameraType', () => {
  const { asFragment } = renderWithProviders(<CameraType />);
  expect(asFragment()).toMatchSnapshot();
});
