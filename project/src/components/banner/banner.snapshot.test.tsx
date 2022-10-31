import { bannerMock } from '../../test/test-mocks';
import { renderWithProviders } from '../../test/utils/render-with-redux';
import Banner from './banner';

test('Render Banner', () => {
  const { asFragment } = renderWithProviders(<Banner promo={bannerMock}/>);
  expect(asFragment()).toMatchSnapshot();
});
