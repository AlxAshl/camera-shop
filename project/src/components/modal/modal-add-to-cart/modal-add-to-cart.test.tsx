import { renderWithProviders } from '../../../test/utils/render-with-redux';
import { fireEvent, screen } from '@testing-library/react';
import { basketProductsMock } from '../../../test/test-mocks';
import ModalAddToCart from './modal-add-to-cart';

const mockDispatch = jest.fn();
jest.mock('../../../hooks/useAppDispatch', () => ({
  useAppDispatch: () => mockDispatch
}));

describe('ModalAddToCart component', () => {
  test('X button works correctly', () => {
    renderWithProviders(<ModalAddToCart />, {initialState: { BASKET: { basketProducts: basketProductsMock, productId: 1}, FILTERS: {allProducts: basketProductsMock}}});
    const button = screen.getByTestId('cross-btn-test');
    fireEvent.click(button);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });
  test('Back to purchases button works correctly', () => {
    renderWithProviders(<ModalAddToCart/>, {initialState: { BASKET: { basketProducts: basketProductsMock, productId: 1}, FILTERS: {allProducts: basketProductsMock}}});
    const button = screen.getByTestId('cart-button-test');
    fireEvent.click(button);
    expect(mockDispatch).toHaveBeenCalledTimes(3);
  });
  test('Escape works correctly', () => {
    renderWithProviders(<ModalAddToCart />, {initialState: { BASKET: { basketProducts: basketProductsMock, productId: 1}, FILTERS: {allProducts: basketProductsMock}}});
    fireEvent.keyDown(document, {key: 'Escape', code: 'Escape', charCode: 27});
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });
});
