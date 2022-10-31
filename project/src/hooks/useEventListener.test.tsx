import ProductPage from '../pages/product-page/product-page';
import { renderWithProviders } from '../test/utils/render-with-redux';
import { fireEvent, screen } from '@testing-library/react';

describe('useEventlistener  hook', () => {
  test('changes document style when loaded', () => {
    renderWithProviders(<ProductPage />, );
    fireEvent.click(screen.getByText('Оставить свой отзыв'));
    setTimeout(()=>{expect(document.body.style.overflow).toBe('hidden');},1000);
  });
  test('changes document style back when modal closes', () => {
    renderWithProviders(<ProductPage />, );
    fireEvent.click(screen.getByText('Оставить свой отзыв'));
    fireEvent.click(screen.getByText('Оставить свой отзыв'));
    setTimeout(()=>{expect(document.body.style.overflow).toBe('visible');},1000);
  });
  test('changes document style back when modal closes on escape keypress', () => {
    renderWithProviders(<ProductPage />, );
    fireEvent.click(screen.getByText('Оставить свой отзыв'));
    fireEvent.keyDown(document, {key: 'Escape', code: 'Escape', charCode: 27});
    setTimeout(()=>{expect(document.body.style.overflow).toBe('visible');},1000);
  });
  test('modal doesnt open after escape key was pressed(listener removed)', () => {
    renderWithProviders(<ProductPage />, );
    fireEvent.click(screen.getByText('Оставить свой отзыв'));
    fireEvent.keyDown(document, {key: 'Escape', code: 'Escape', charCode: 27});
    fireEvent.keyDown(document, {key: 'Escape', code: 'Escape', charCode: 27});
    setTimeout(()=>{expect(document.body.style.overflow).toBe('visible');},1000);
  });
});
