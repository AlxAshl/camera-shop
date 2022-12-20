import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../../../../test/utils/render-with-redux';
import ModalAddToCartSuccess from './modal-add-to-cart-success';
import * as router from 'react-router';

const mockNavigate = jest.fn();
const mockDispatch = jest.fn();
jest.mock('../../../../hooks/useAppDispatch', () => ({
  useAppDispatch: () => mockDispatch
}));

describe('ModalAddtoCartSuccess component', () => {
  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => mockNavigate);
  });
  test('X button works correctly', () => {
    renderWithProviders(<ModalAddToCartSuccess />, );
    const button = screen.getByTestId('cross-btn-test');
    fireEvent.click(button);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });
  test('Back to purchases button works correctly', () => {
    renderWithProviders(<ModalAddToCartSuccess />, );
    const button = screen.getByTestId('continue-purchases-test');
    fireEvent.click(button);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });
  test('Escape works correctly', () => {
    renderWithProviders(<ModalAddToCartSuccess />, );
    fireEvent.keyDown(document, {key: 'Escape', code: 'Escape', charCode: 27});
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });
  test('Overlay click works correctly', () => {
    renderWithProviders(<ModalAddToCartSuccess />, );
    const overlay = screen.getByTestId('overlay-test');
    fireEvent.click(overlay);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });
  test('Go to basket button has correct link', () => {
    renderWithProviders(<ModalAddToCartSuccess />, );
    const goToBasketButton = screen.getByTestId('go-to-basket-test');
    fireEvent.click(goToBasketButton);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });
});
