import { renderWithProviders } from '../../../test/utils/render-with-redux';
import { fireEvent, screen } from '@testing-library/react';
import SortBar from './sort-bar';
import { AppRoute } from '../../../const';

describe('SortBar component', () => {
  test('renders radio boxes unchecked', () => {
    renderWithProviders(<SortBar/>, {route: AppRoute.Catalog});
    const inputs = screen.getAllByTestId('sort-test');
    expect(inputs).toHaveLength(4);
    expect(inputs[0]).not.toBeChecked();
  });
  test('url updates checkbox', () => {
    renderWithProviders(<SortBar/>, {route: `${AppRoute.Catalog}?_sort=rating&_order=asc`});
    const sortPopular = screen.getByText('по популярности');
    const sortOrder = screen.getByLabelText('По возрастанию');
    setTimeout(()=>{
      expect(sortPopular).toBeChecked();
      expect(sortOrder).toBeChecked();
    }, 100);
  });
  test('url updates checkbox and adds second sortquery', () => {
    renderWithProviders(<SortBar/>, {route: `${AppRoute.Catalog}?_sort=rating`});
    const sortPopular = screen.getByText('по популярности');
    const sortOrder = screen.getByLabelText('По возрастанию');
    setTimeout(()=>{
      expect(sortPopular).toBeChecked();
      expect(sortOrder).toBeChecked();
    }, 100);
  });
  test('adds second sort condition upon checkbox clicking', () => {
    renderWithProviders(<SortBar/>, {route: `${AppRoute.Catalog}`});
    const sortPopular = screen.getByText('по популярности');
    const sortOrder = screen.getByLabelText('По возрастанию');
    fireEvent.click(sortPopular);
    setTimeout(()=>{
      expect(sortPopular).toBeChecked();
      expect(sortOrder).toBeChecked();
    }, 100);
  });
});
