import { reviewDataType } from '../../types/review';
import { validateInput } from './validate-input';


export function validateForm(data: reviewDataType) {
  let validationStatus = true;
  Object.entries(data).forEach(([key, value]) =>{
    if (key !== 'review') {
      if(value === '') {
        const failedInput = document.querySelector(`input[name=${key}]`);
        validateInput(failedInput as HTMLInputElement);
        validationStatus = false;
      }
    }
    if(key === 'review') {
      if(String(value).length < 5) {
        const failedInput = document.querySelector(`textarea[name=${key}]`);
        validateInput(failedInput as HTMLInputElement);
      }
    }
    if(key === 'rating') {
      if(value < 1) {
        const failedInput = document.querySelector(`input[name=${key}]`);
        if(failedInput && failedInput.parentElement?.parentElement){
          failedInput.parentElement.parentElement.parentElement?.classList.add('is-invalid');
        }
        validationStatus = false;
      }
    }
  });
  return validationStatus;
}

