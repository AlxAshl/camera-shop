import { basketProductMock } from '../../../test/test-mocks';
import { renderWithProviders } from '../../../test/utils/render-with-redux';
import BasketProduct from './basket-product';


test('Render BasketProduct', () => {
  const { asFragment } = renderWithProviders(<BasketProduct basketProduct={basketProductMock}/>);
  expect(asFragment()).toMatchSnapshot();
});
