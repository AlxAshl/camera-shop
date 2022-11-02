import { renderWithProviders } from '../../../test/utils/render-with-redux';
import ModalSuccess from './modal-success';
import { fireEvent, screen } from '@testing-library/react';

const mockDispatch = jest.fn();
jest.mock('../../../hooks/useAppDispatch', () => ({
  useAppDispatch: () => mockDispatch
}));

describe('ModalSuccess component', () => {
  test('X button works correctly', () => {
    renderWithProviders(<ModalSuccess />, );
    const button = screen.getByTestId('cross-btn-test');
    fireEvent.click(button);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });
  test('Back to purchases button works correctly', () => {
    renderWithProviders(<ModalSuccess />, );
    const button = screen.getByTestId('success-button-test');
    fireEvent.click(button);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });
  test('Escape works correctly', () => {
    renderWithProviders(<ModalSuccess />, );
    fireEvent.keyDown(document, {key: 'Escape', code: 'Escape', charCode: 27});
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });
});
