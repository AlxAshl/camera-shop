import { renderWithProviders } from '../../../../test/utils/render-with-redux';
import ModalReviewSuccess from './modal-review-success';


test('Render ModalSuccess', () => {
  const { asFragment } = renderWithProviders(<ModalReviewSuccess />);
  expect(asFragment()).toMatchSnapshot();
});
