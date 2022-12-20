import { fireEvent, screen } from '@testing-library/react';
import { basketProductsMock } from '../../../test/test-mocks';
import { renderWithProviders } from '../../../test/utils/render-with-redux';
import ModalRemoveItem from './modal-remove-item';

const mockDispatch = jest.fn();
jest.mock('../../../hooks/useAppDispatch', () => ({
  useAppDispatch: () => mockDispatch
}));

describe('ModalRemoveItem component', () => {
  test('X button works correctly', () => {
    renderWithProviders(<ModalRemoveItem />, {initialState: { BASKET: { basketProducts: basketProductsMock, productId: 1}, FILTERS: {allProducts: basketProductsMock}}} );
    const button = screen.getByTestId('cross-btn-test');
    fireEvent.click(button);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });
  test('Back to purchases button works correctly', () => {
    renderWithProviders(<ModalRemoveItem />, {initialState: { BASKET: { basketProducts: basketProductsMock, productId: 1}, FILTERS: {allProducts: basketProductsMock}}} );
    const button = screen.getByTestId('continue-purchases-test');
    fireEvent.click(button);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });
  test('Escape works correctly', () => {
    renderWithProviders(<ModalRemoveItem />, {initialState: { BASKET: { basketProducts: basketProductsMock, productId: 1}, FILTERS: {allProducts: basketProductsMock}}});
    fireEvent.keyDown(document, {key: 'Escape', code: 'Escape', charCode: 27});
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });
  test('Overlay click works correctly', () => {
    renderWithProviders(<ModalRemoveItem />, {initialState: { BASKET: { basketProducts: basketProductsMock, productId: 1}, FILTERS: {allProducts: basketProductsMock}}});
    const overlay = screen.getByTestId('overlay-test');
    fireEvent.click(overlay);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });
  test('Remove item button works correctly', () => {
    renderWithProviders(<ModalRemoveItem />, {initialState: { BASKET: { basketProducts: basketProductsMock, productId: 1}, FILTERS: {allProducts: basketProductsMock}}});
    const removeItemButton = screen.getByTestId('remove-button-test');
    fireEvent.click(removeItemButton);
    expect(mockDispatch).toHaveBeenCalledTimes(2);
  });
});
