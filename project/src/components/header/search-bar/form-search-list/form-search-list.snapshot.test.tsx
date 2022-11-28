import { productsMock } from '../../../../test/test-mocks';
import { renderWithProviders } from '../../../../test/utils/render-with-redux';
import FormSearchList from './form-search-list';


const handleSearchResetButton = jest.fn;
test('Render Formsearchlist', () => {
  const { asFragment } = renderWithProviders(<FormSearchList searchProducts={productsMock} onLinkPass={() => handleSearchResetButton()}/>);
  expect(asFragment()).toMatchSnapshot();
});
