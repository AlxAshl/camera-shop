import { renderWithProviders } from '../../../test/utils/render-with-redux';
import { fireEvent, screen } from '@testing-library/react';
import ModalReview from './modal-review';

const mockDispatch = jest.fn();
jest.mock('../../../hooks/useAppDispatch', () => ({
  useAppDispatch: () => mockDispatch
}));

describe('ModalReview component render', () => {
  test('X button works correctly', () => {
    renderWithProviders(<ModalReview id={1} isReviewActive/>, );
    const button = screen.getByTestId('cross-btn-test');
    fireEvent.click(button);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });
  test('Submit button works correctly', () => {
    renderWithProviders(<ModalReview id={1} isReviewActive/>, );
    const button = screen.getByTestId('submit-test');
    fireEvent.click(button);
    setTimeout(()=>{
      expect(mockDispatch).toHaveBeenCalledTimes(1);
    },1000);
  });
  test('Escape works correctly', () => {
    renderWithProviders(<ModalReview id={1} isReviewActive/>, );
    fireEvent.keyDown(document, {key: 'Escape', code: 'Escape', charCode: 27});
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });
});

describe('ModalReview component form', () => {
  test('Sends review on succesfull validation', () => {
    renderWithProviders(<ModalReview id={1} isReviewActive/>, );
    const button = screen.getByTestId('submit-test');
    fireEvent.click(screen.getByTitle('Отлично'));
    const nameInput = screen.getByPlaceholderText('Введите ваше имя');
    const advanageInput = screen.getByPlaceholderText('Основные преимущества товара');
    const disadvantageInput = screen.getByPlaceholderText('Главные недостатки товара');
    const reviewInput = screen.getByPlaceholderText('Поделитесь своим опытом покупки');
    nameInput.textContent = '1';
    advanageInput.textContent = '1';
    disadvantageInput.textContent = '1';
    reviewInput.textContent = '123456';
    fireEvent.click(button);
    setTimeout(()=>{
      expect(mockDispatch).toHaveBeenCalledTimes(3);
    },1000);
  });
  test('Rejects to send review on unsuccesfull validation, adds invalid class to failed input', () => {
    renderWithProviders(<ModalReview id={1} isReviewActive/>, );
    const button = screen.getByTestId('submit-test');
    fireEvent.click(screen.getByTitle('Отлично'));
    const nameInput = screen.getByPlaceholderText('Введите ваше имя');
    const nameInputParent = screen.getByTestId('custom-input-test');
    const advanageInput = screen.getByPlaceholderText('Основные преимущества товара');
    const disadvantageInput = screen.getByPlaceholderText('Главные недостатки товара');
    const reviewInput = screen.getByPlaceholderText('Поделитесь своим опытом покупки');
    nameInput.textContent = '';
    advanageInput.textContent = '1';
    disadvantageInput.textContent = '1';
    reviewInput.textContent = '123456';
    fireEvent.click(button);
    setTimeout(()=>{
      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(nameInputParent).toHaveClass('custom-input form-review__item is-invalid');
    },1000);
  });
});
