import { reviewsMock } from '../../../test/test-mocks';
import { renderWithProviders } from '../../../test/utils/render-with-redux';
import ReviewCard from './review-card';

test('Render ReviewCard', () => {
  const { asFragment } = renderWithProviders(<ReviewCard data={reviewsMock[0]}/>);
  expect(asFragment()).toMatchSnapshot();
});
