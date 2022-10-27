import { renderWithProviders } from '../../test/utils/render-with-redux';
import Rating from './rating';
import { screen } from '@testing-library/react';

describe('Rating component', () => {
  test('renders content correctly', () => {
    renderWithProviders(<Rating rating={2} id={4} ariaHiddenState/>,);
    setTimeout(()=> {
      const stars = screen.getByTestId('star-test');
      expect(stars).toHaveLength(2);
    },500);
  });
});
