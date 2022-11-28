import { renderWithProviders } from '../../../test/utils/render-with-redux';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import SearchBar from './search-bar';
import { AppRoute } from '../../../const';
import { productsMock } from '../../../test/test-mocks';

const mockDispatch = jest.fn();
jest.mock('../../../hooks/useAppDispatch', () => ({
  useAppDispatch: () => mockDispatch
}));

describe('SearchBar component', () => {
  test('Shows popup on matching input', async () => {
    renderWithProviders(<SearchBar/>, {initialState: { FILTERS: { allProducts: productsMock}} , route: AppRoute.Catalog});
    const searchInput = screen.getByTestId('search-input-test');
    fireEvent.input(searchInput, { target: { value: 'Look'}});
    await (waitFor(() => expect(screen.getByText('Look Identify2')),{timeout:500}));
  });
  test('Shows nothing on mismatched input', async () => {
    renderWithProviders(<SearchBar/>, {initialState: { FILTERS: { allProducts: productsMock}} , route: AppRoute.Catalog});
    const searchInput = screen.getByTestId('search-input-test');
    const searchForm = screen.getByTestId('search-form-test');
    fireEvent.input(searchInput, { target: { value: 'uuuu'}});
    await (waitFor(() => expect(screen.queryByText('Look Identify2')).not.toBeInTheDocument(),{timeout:500}));
    await (waitFor(() => expect(searchForm).not.toHaveClass('list-opened'),{timeout:500}));
  });
  test('Deletes query on reset button', async () => {
    renderWithProviders(<SearchBar/>, {initialState: { FILTERS: { allProducts: productsMock}} , route: AppRoute.Catalog});
    const searchInput = screen.getByTestId('search-input-test');
    const searchForm = screen.getByTestId('search-form-test');
    const resetButton = screen.getByTestId('search-reset-test');
    fireEvent.input(searchInput, { target: { value: 'Look'}});
    fireEvent.click(resetButton);
    await (waitFor(() => expect(screen.queryByText('Look Identify2')).not.toBeInTheDocument(),{timeout:300}));
    await (waitFor(() => expect(searchForm).not.toHaveClass('list-opened'),{timeout:300}));
  });
});
