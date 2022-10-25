import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../test/utils/render-with-redux';
import PaginationList, {} from './pagination-list';

describe('Pagination-list component', () => {
  test('Component rendered five pages', () => {
    renderWithProviders(<PaginationList/>, { initialState: {
      PRODUCT: { productCount: 40 }
    }});
    expect(screen.getAllByTestId('pagination-item-test')).toHaveLength(5);
  });
  test('Next button is not rendered, previous button is rendered', () => {
    renderWithProviders(<PaginationList/>, { initialState: {
      PRODUCT: { productCount: 40, currentPage: 5 }
    }});
    expect(screen.queryByTestId('pagination-item-next-test')).not.toBeInTheDocument();
    expect(screen.getByTestId('pagination-item-previous-test')).toBeInTheDocument();
  });
  test('Previous button is not rendered, next button is rendered', () => {
    renderWithProviders(<PaginationList/>, { initialState: {
      PRODUCT: { productCount: 40, currentPage: 1 }
    }});
    expect(screen.queryByTestId('pagination-item-previous-test')).not.toBeInTheDocument();
    expect(screen.getByTestId('pagination-item-next-test')).toBeInTheDocument();
  });
  test('Current page button is active, others are not', () => {
    renderWithProviders(<PaginationList/>, { initialState: {
      PRODUCT: { productCount: 40, currentPage: 1 }
    }});
    expect(screen.queryByText('1')).toHaveClass('pagination__link pagination__link--active');
    expect(screen.queryByText('2')).toHaveClass('pagination__link');
  });
});
