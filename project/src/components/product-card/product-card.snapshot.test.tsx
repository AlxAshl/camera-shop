import { productMock } from '../../test/test-mocks';
import { renderWithProviders } from '../../test/utils/render-with-redux';
import ProductCard from './product-card';

test('Render ProductCard', () => {
  const { asFragment } = renderWithProviders(<ProductCard product={productMock}/>);
  expect(asFragment()).toMatchSnapshot();
});
