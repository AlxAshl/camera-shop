import { screen } from '@testing-library/react';
import ReviewCard from './review-card';
import { reviewMock } from '../../../test/test-mocks';
import { renderWithProviders } from '../../../test/utils/render-with-redux';

describe('Review-card component', () => {
  test('renders content correctly', () => {
    renderWithProviders(<ReviewCard data={reviewMock}/>,);
    expect(screen.getByTestId('review-name-test')).toHaveTextContent(`${reviewMock.userName}`);
    expect(screen.getByTestId('review-create-test')).toBeInTheDocument();
    expect(screen.getByTestId('review-rating-test')).toHaveTextContent(`Оценка: ${reviewMock.rating}`);
    expect(screen.getByTestId('review-advatanges-test')).toHaveTextContent(`${reviewMock.advantage}`);
    expect(screen.getByTestId('review-disadvatanges-test')).toHaveTextContent(`${reviewMock.disadvantage}`);
    expect(screen.getByTestId('review-review-test')).toHaveTextContent(`${reviewMock.review}`);
  });
});
