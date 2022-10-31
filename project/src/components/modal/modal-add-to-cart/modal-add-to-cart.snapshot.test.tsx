import { renderWithProviders } from '../../../test/utils/render-with-redux';
import ModalAddToCart from './modal-add-to-cart';

test('Render ModalAddToCart', () => {
  const { asFragment } = renderWithProviders(<ModalAddToCart isAddToCartActive/>);
  expect(asFragment()).toMatchSnapshot();
});
