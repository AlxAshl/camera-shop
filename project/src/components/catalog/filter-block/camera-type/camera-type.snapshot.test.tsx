import { renderWithProviders } from '../../../../test/utils/render-with-redux';
import { CameraTypeBlock } from './camera-type-block';

test('Render CameraType', () => {
  const { asFragment } = renderWithProviders(<CameraTypeBlock />);
  expect(asFragment()).toMatchSnapshot();
});
