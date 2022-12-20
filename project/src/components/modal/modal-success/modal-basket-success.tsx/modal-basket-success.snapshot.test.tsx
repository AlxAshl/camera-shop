import { renderWithProviders } from '../../../../test/utils/render-with-redux';
import ModalBasketSuccess from './modal-basket-success';


test('Render ModalBasketSuccess', () => {
  const { asFragment } = renderWithProviders(<ModalBasketSuccess />);
  expect(asFragment()).toMatchSnapshot();
});
