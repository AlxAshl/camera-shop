import SimilarProducts from './similar-products';
import { productMock, productsMock } from '../../../test/test-mocks';
import { renderWithProviders } from '../../../test/utils/render-with-redux';
import * as Hooks from '../../../hooks/useAppSelector';
import { fireEvent, screen } from '@testing-library/react';


jest.mock('../../../hooks/useAppselector');
const spySelect = jest.spyOn(Hooks, 'useAppSelector');
describe('Similar component', () => {
  beforeEach(() => {
    spySelect.mockReturnValue(productsMock);
  });
  test('Characteristics tab is active on initial render', () => {
    renderWithProviders(<SimilarProducts camera={productMock}/>, {initialState: {PRODUCT: {
      products: productsMock
    }}});
    expect(spySelect).toHaveBeenCalledTimes(2);
  });
  test('Renders correct number of cards', () => {
    renderWithProviders(<SimilarProducts camera={productMock}/>, {initialState: {PRODUCT: {
      products: productsMock
    }}});

    const cards = screen.getAllByTestId('product-card-test');
    expect(cards).toHaveLength(3);
  });
  test('Renders slider buttons correctly', () => {
    renderWithProviders(<SimilarProducts camera={productMock}/>, {initialState: {PRODUCT: {
      products: [productsMock]
    }}});
    const prevButton = screen.getByTestId('slider-controls--prev-test');
    const nextButton = screen.getByTestId('slider-controls--next-test');
    expect(nextButton).not.toHaveAttribute('disabled');
    expect(prevButton).toHaveAttribute('disabled');
  });
  test('Renders one component and slider buttons correctly', () => {
    renderWithProviders(<SimilarProducts camera={productMock}/>, {initialState: {PRODUCT: {
      products: [productMock]
    }}});
    setTimeout(()=> {
      const cards = screen.getAllByTestId('product-card-test');
      expect(cards).toHaveLength(1);
      const prevButton = screen.getByTestId('slider-controls--prev-test');
      const nextButton = screen.getByTestId('slider-controls--next-test');
      expect(nextButton).toHaveAttribute('disabled');
      expect(prevButton).not.toHaveAttribute('disabled');
    }, 1000);
  });
  test('Renders correct number of components after slider button fire', () => {
    renderWithProviders(<SimilarProducts camera={productMock}/>, {initialState: {PRODUCT: {
      products: productsMock
    }}});
    const prevButton = screen.getByTestId('slider-controls--prev-test');
    const nextButton = screen.getByTestId('slider-controls--next-test');
    fireEvent.click(nextButton);
    const cards = screen.getAllByTestId('product-card-test');
    expect(cards).toHaveLength(1);
    expect(nextButton).toHaveAttribute('disabled');
    expect(prevButton).not.toHaveAttribute('disabled');
  });
});
