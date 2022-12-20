import { ActionCreatorWithNonInferrablePayload } from '@reduxjs/toolkit';
import { MutableRefObject, useEffect, useState } from 'react';
import { useAppDispatch } from './useAppDispatch';


export default function useQuantityInputEventListener(inputField: MutableRefObject<HTMLInputElement>, action: ActionCreatorWithNonInferrablePayload, id: number) {

  const [value, setValue] = useState('');
  const isEscapeKey = (evt:KeyboardEvent) => evt.key === 'Escape';
  const isEnterKey = (evt:KeyboardEvent) => evt.key === 'Enter';
  const dispatch = useAppDispatch();

  useEffect(()=>{
    const handleEscKeyPress = (evt: KeyboardEvent) => {
      if(isEscapeKey(evt)) {
        (evt.target as HTMLInputElement)?.blur();
      }
    };

    const handleEnterKeyPress = (evt: KeyboardEvent) => {
      if(isEnterKey(evt)) {
        Number(inputField.current.value) !== 0
          ? setValue(inputField.current.value)
          : dispatch(action({quantity: 1, id: id}));
        (evt.target as HTMLInputElement)?.blur();
      }
    };

    const handleBlurEvent = () => {
      Number(inputField.current.value) !== 0
        ? setValue(inputField.current.value)
        : dispatch(action({quantity: 1, id: id}));
      document.removeEventListener('blur', handleBlurEvent);
      document.removeEventListener('keydown', handleEscKeyPress);
      document.removeEventListener('keydown', handleEnterKeyPress);
    };

    inputField.current?.addEventListener('blur', handleBlurEvent);
    inputField.current?.addEventListener('keydown', handleEscKeyPress);
    inputField.current?.addEventListener('keydown', handleEnterKeyPress);
  },[inputField]);

  return value;
}
