import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../../../../test/utils/render-with-redux';
import ModalBasketSuccess from './modal-basket-success';

const mockDispatch = jest.fn();
jest.mock('../../../../hooks/useAppDispatch', () => ({
  useAppDispatch: () => mockDispatch
}));

describe('ModalBasketSuccess component', () => {
  test('X button works correctly', () => {
    renderWithProviders(<ModalBasketSuccess />, );
    const button = screen.getByTestId('cross-btn-test');
    fireEvent.click(button);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });
  test('Back to purchases button works correctly', () => {
    renderWithProviders(<ModalBasketSuccess />, );
    const button = screen.getByTestId('continue-purchases-test');
    fireEvent.click(button);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });
  test('Escape works correctly', () => {
    renderWithProviders(<ModalBasketSuccess />, );
    fireEvent.keyDown(document, {key: 'Escape', code: 'Escape', charCode: 27});
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });
  test('Overlay click works correctly', () => {
    renderWithProviders(<ModalBasketSuccess />, );
    const overlay = screen.getByTestId('overlay-test');
    fireEvent.click(overlay);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });
});
