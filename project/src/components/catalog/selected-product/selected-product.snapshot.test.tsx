import { productMock } from '../../../test/test-mocks';
import { renderWithProviders } from '../../../test/utils/render-with-redux';
import SelectedProduct from './selected-product';

test('Render SelectedProduct', () => {
  const { asFragment } = renderWithProviders(<SelectedProduct camera={productMock}/>);
  expect(asFragment()).toMatchSnapshot();
});
