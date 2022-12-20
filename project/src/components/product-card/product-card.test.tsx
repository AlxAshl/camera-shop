import { renderWithProviders } from '../../test/utils/render-with-redux';
import { screen } from '@testing-library/react';
import ProductCard from './product-card';
import { basketProductMock, basketProductsMock, productMock } from '../../test/test-mocks';
import { AppRoute } from '../../const';

describe('ProductCard component', () => {
  test('renders content correctly', () => {
    renderWithProviders(<ProductCard product={productMock}/>,);
    setTimeout(()=>{
      expect(screen.getByTestId('link-test')).toHaveAttribute('href', `${AppRoute.Product}/${productMock.id}`);
      expect(screen.getByTestId('rating-test')).toHaveTextContent(`Рейтинг: ${productMock.rating}`);
      expect(screen.getByTestId('rates-total')).toHaveTextContent(`Всего оценок: ${productMock.reviewCount}`);
      expect(screen.getByTestId('price-test')).toHaveTextContent(`${productMock.price}`);
    },1000);
  });
  test('Shows button if product is not yet added to basket', () => {
    renderWithProviders(<ProductCard product={productMock}/>, {initialState: { BASKET: { basketProducts: basketProductsMock}}});
    expect(screen.getByText('Купить')).toBeInTheDocument();
    expect(screen.queryByText('В корзине')).not.toBeInTheDocument();
  });
  test('Shows link to basket if product is already added to basket', () => {
    renderWithProviders(<ProductCard product={productMock}/>, {initialState: { BASKET: { basketProducts: [basketProductMock]}}});
    expect(screen.getByText('В корзине')).toBeInTheDocument();
    expect(screen.queryByText('Купить')).not.toBeInTheDocument();
  });
});


