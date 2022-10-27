import { reviewsMock } from '../../test/test-mocks';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils/render-with-redux';
import ReviewsList from './reviews-list';
import * as Hooks from '../../hooks/useAppSelector';

jest.mock('../../hooks/useAppSelector');
const spySelect = jest.spyOn(Hooks, 'useAppSelector');
const mockDispatch = jest.fn();
jest.mock('../../hooks/useAppDispatch', () => ({
  useAppDispatch: () => mockDispatch
}));

describe('Review-list component', () => {
  beforeEach(() => {
    spySelect.mockReturnValue(reviewsMock);
  });
  test('renders correct ammount of reviews', () => {
    renderWithProviders(<ReviewsList id={4}/>, {
      initialState: {
        REVIEW: { reviews: reviewsMock }
      }
    });
    const card = screen.getAllByTestId('review-card-test');
    expect(card).toHaveLength(3);
  });
  test('more reviews on expand button click, and hiding button if there are no more reviews', () => {
    renderWithProviders(<ReviewsList id={4}/>, {
      initialState: {
        REVIEW: { reviews: reviewsMock }
      }
    });
    fireEvent.click(screen.getByText('Показать больше отзывов'));
    const card = screen.getAllByTestId('review-card-test');
    expect(card).toHaveLength(4);
    const expand = (screen.queryByText('Показать больше отзывов'));
    expect(expand).not.toBeInTheDocument();
  });
  test('Review-modal open on click', () => {
    renderWithProviders(<ReviewsList id={4}/>,);
    const modalButton = screen.getByText('Оставить свой отзыв');
    fireEvent.click(modalButton);
    setTimeout(()=>{
      expect(mockDispatch).toHaveBeenCalledTimes(1);
    },100);

  });
  test('No reviews message if array is empty', () => {
    renderWithProviders(<ReviewsList id={4}/>, {
      initialState: {
        REVIEW: { reviews: [] }
      }
    });
    const noReviewsMessage = (screen.queryByText('Показать больше отзывов'));
    expect(noReviewsMessage).toBeInTheDocument();
  });
});
