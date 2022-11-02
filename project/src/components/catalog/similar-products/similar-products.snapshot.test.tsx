import { productMock } from '../../../test/test-mocks';
import { renderWithProviders } from '../../../test/utils/render-with-redux';
import SimilarProducts from './similar-products';

test('Render Simiar', () => {
  const { asFragment } = renderWithProviders(<SimilarProducts camera={productMock}/>);
  expect(asFragment()).toMatchSnapshot();
});
