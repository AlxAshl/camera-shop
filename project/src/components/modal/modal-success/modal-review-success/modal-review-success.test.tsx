import ModalReviewSuccess from './modal-review-success';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../../../../test/utils/render-with-redux';


const mockDispatch = jest.fn();
jest.mock('../../../../hooks/useAppDispatch', () => ({
  useAppDispatch: () => mockDispatch
}));

describe('ModalSuccess component', () => {
  test('X button works correctly', () => {
    renderWithProviders(<ModalReviewSuccess />, );
    const button = screen.getByTestId('cross-btn-test');
    fireEvent.click(button);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });
  test('Back to purchases button works correctly', () => {
    renderWithProviders(<ModalReviewSuccess />, );
    const button = screen.getByTestId('success-button-test');
    fireEvent.click(button);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });
  test('Escape works correctly', () => {
    renderWithProviders(<ModalReviewSuccess />, );
    fireEvent.keyDown(document, {key: 'Escape', code: 'Escape', charCode: 27});
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });
});
