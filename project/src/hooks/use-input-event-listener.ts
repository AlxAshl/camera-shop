import { ActionCreatorWithNonInferrablePayload } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useAppDispatch } from './useAppDispatch';


export default function useInputEventListener(inputField: HTMLInputElement, action: ActionCreatorWithNonInferrablePayload) {

  const [value, setValue] = useState('');
  const isEscapeKey = (evt:KeyboardEvent) => evt.key === 'Escape';
  const isEnterKey = (evt:KeyboardEvent) => evt.key === 'Enter';
  const dispatch = useAppDispatch();

  useEffect(()=>{
    const handleEscKeyPress = (evt: KeyboardEvent) => {
      if(isEscapeKey(evt)) {
        (evt.target as HTMLInputElement)?.blur();
        document.removeEventListener('keydown', handleEscKeyPress);
        document.removeEventListener('keydown', handleEnterKeyPress);
      }
    };
    const handleEnterKeyPress = (evt: KeyboardEvent) => {
      if(isEnterKey(evt)) {
        inputField.value !== ''
          ? setValue(inputField.value)
          : dispatch(action(inputField.value));
        (evt.target as HTMLInputElement)?.blur();
        document.removeEventListener('keydown', handleEscKeyPress);
        document.removeEventListener('keydown', handleEnterKeyPress);
      }
    };
    inputField?.addEventListener('keydown', handleEscKeyPress);
    inputField?.addEventListener('keydown', handleEnterKeyPress);
  },[inputField]);

  return value;
}
