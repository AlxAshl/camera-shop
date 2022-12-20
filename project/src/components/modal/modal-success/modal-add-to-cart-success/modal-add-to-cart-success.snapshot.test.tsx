import { renderWithProviders } from '../../../../test/utils/render-with-redux';
import ModalAddToCartSuccess from './modal-add-to-cart-success';


test('Render ModalAddToCartSuccess', () => {
  const { asFragment } = renderWithProviders(<ModalAddToCartSuccess />);
  expect(asFragment()).toMatchSnapshot();
});
