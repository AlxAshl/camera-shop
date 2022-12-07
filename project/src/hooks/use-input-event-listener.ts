import { ActionCreatorWithNonInferrablePayload } from '@reduxjs/toolkit';
import { MutableRefObject, useEffect, useState } from 'react';
import { useAppDispatch } from './useAppDispatch';


export default function useInputEventListener(inputField: MutableRefObject<HTMLInputElement>, action: ActionCreatorWithNonInferrablePayload) {

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
        inputField.current.value !== ''
          ? setValue(inputField.current.value)
          : dispatch(action(inputField.current.value));
        (evt.target as HTMLInputElement)?.blur();
        document.removeEventListener('keydown', handleEscKeyPress);
        document.removeEventListener('keydown', handleEnterKeyPress);
      }
    };
    inputField.current?.addEventListener('keydown', handleEscKeyPress);
    inputField.current?.addEventListener('keydown', handleEnterKeyPress);
  },[inputField]);

  return value;
}
