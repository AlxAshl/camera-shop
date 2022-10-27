import { renderWithProviders } from '../../test/utils/render-with-redux';
import { screen } from '@testing-library/react';
import ProductCard from './product-card';
import { productMock } from '../../test/test-mocks';
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
});


