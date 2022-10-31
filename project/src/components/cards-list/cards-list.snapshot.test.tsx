import { productsMock } from '../../test/test-mocks';
import { renderWithProviders } from '../../test/utils/render-with-redux';
import CardsList from './cards-list';

test('Render CardsList', () => {
  const { asFragment } = renderWithProviders(<CardsList products={productsMock}/>);
  expect(asFragment()).toMatchSnapshot();
});
