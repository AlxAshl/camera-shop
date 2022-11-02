import { renderWithProviders } from '../../../test/utils/render-with-redux';
import ModalSuccess from './modal-success';

test('Render ModalSuccess', () => {
  const { asFragment } = renderWithProviders(<ModalSuccess />);
  expect(asFragment()).toMatchSnapshot();
});