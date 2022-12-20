import { productMock } from '../../test/test-mocks';
import { renderWithProviders } from '../../test/utils/render-with-redux';
import BasketItem from './basket-item';


test('Render BasketItem', () => {
  const { asFragment } = renderWithProviders(<BasketItem camera={productMock}/>);
  expect(asFragment()).toMatchSnapshot();
});
