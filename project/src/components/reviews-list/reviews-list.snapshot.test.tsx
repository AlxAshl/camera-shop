import { renderWithProviders } from '../../test/utils/render-with-redux';
import ReviewsList from './reviews-list';

test('Render ReviewsList', () => {
  const id = 4;
  const { asFragment } = renderWithProviders(<ReviewsList id={id}/>);
  expect(asFragment()).toMatchSnapshot();
});
