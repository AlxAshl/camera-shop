import { productMock } from '../../../test/test-mocks';
import { renderWithProviders } from '../../../test/utils/render-with-redux';
import Similar from './similar';

test('Render Simiar', () => {
  const { asFragment } = renderWithProviders(<Similar camera={productMock}/>);
  expect(asFragment()).toMatchSnapshot();
});
