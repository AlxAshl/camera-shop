import { renderWithProviders } from '../../../test/utils/render-with-redux';
import ModalReview from './modal-review';

test('Render ModalReview', () => {
  const id = 17;
  const { asFragment } = renderWithProviders(<ModalReview id={id} isReviewActive/>);
  expect(asFragment()).toMatchSnapshot();
});
