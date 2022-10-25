import { renderWithProviders } from '../../test/utils/render-with-redux';
import ModalReview from '../modal/modal-review/modal-review';
import { fireEvent, screen } from '@testing-library/react';

describe('validateInput function', () => {
  test('should change class of fieldBlock on "is-valid" after failed validation leading to click on input', ()=> {
    const isReviewActive = true;
    const id = 2;
    renderWithProviders(<ModalReview isReviewActive={isReviewActive} id={id}/>);
    const inputBlock = screen.getByTitle<HTMLInputElement>('Хорошо');
    const fieldBlock = screen.getByTitle<HTMLFieldSetElement>('form-review');
    fieldBlock.classList.add('is-invalid');
    fireEvent.click(inputBlock);
    expect(fieldBlock).toHaveClass('rate form-review__item is-valid');
  });
});
