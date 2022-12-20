import { basketProductsMock } from '../../../test/test-mocks';
import { renderWithProviders } from '../../../test/utils/render-with-redux';
import ModalAddToCart from './modal-add-to-cart';

test('Render ModalAddToCart', () => {
  const { asFragment } = renderWithProviders(<ModalAddToCart />, {initialState: { BASKET: { basketProducts: basketProductsMock, productId: 1}, FILTERS: {allProducts: basketProductsMock}}});
  expect(asFragment()).toMatchSnapshot();
});
