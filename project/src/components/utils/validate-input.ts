export function validateInput(target: (EventTarget & HTMLInputElement) | (EventTarget & HTMLTextAreaElement)) {

  if (target.parentElement?.parentElement && target.name === 'rating' && (Number(target.value) > 0)) {
    if (!target.parentElement.parentElement.parentElement?.className.includes('is-valid')) {
      target.parentElement.parentElement.parentElement?.classList.add('is-valid');
      target.parentElement.parentElement.parentElement?.classList.remove('is-invalid');
    }
  }

  if (target.parentElement?.parentElement && target.name !== 'review' && typeof(target.value) === 'string') {
    if (!target.parentElement.parentElement.className.includes('is-valid') && target.value.length > 0) {
      target.parentElement.parentElement.className += ' is-valid';
      target.parentElement.parentElement.classList.remove('is-invalid');
    }
  }

  if (target.parentElement?.parentElement && typeof(target.value) === 'string'){
    if(target.value.length === 0) {
      target.parentElement.parentElement.className += ' is-invalid';
      target.parentElement.parentElement.classList.remove('is-valid');
    }
  }

  if (target.parentElement?.parentElement && typeof(target.value) === 'string') {
    if (!target.parentElement.parentElement.className.includes('is-valid') && target.value.length >= 5) {
      target.parentElement.parentElement.className += ' is-valid';
      target.parentElement.parentElement.classList.remove('is-invalid');
    }
  }

  if (target.parentElement?.parentElement && target.name === 'review' && target.value.length < 5) {
    if (!target.parentElement.parentElement.className.includes('is-invalid')) {
      target.parentElement.parentElement.className += ' is-invalid';
      target.parentElement.parentElement.classList.remove('is-valid');
    }
  }

}
