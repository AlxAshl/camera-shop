import { basketProductsMock } from '../../../test/test-mocks';
import { renderWithProviders } from '../../../test/utils/render-with-redux';
import ModalRemoveItem from './modal-remove-item';


test('Render ModalRemoveItem', () => {
  const { asFragment } = renderWithProviders(<ModalRemoveItem />, {initialState: { BASKET: { basketProducts: basketProductsMock, productId: 1}, FILTERS: {allProducts: basketProductsMock}}});
  expect(asFragment()).toMatchSnapshot();
});
