import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useAppDispatch } from './useAppDispatch';


export const useEventListener = (action: ActionCreatorWithoutPayload<string>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const isEscapeKey = (evt:KeyboardEvent) => evt.key === 'Escape';
    const handleEscKeyPress = (evt: KeyboardEvent) => {
      if(isEscapeKey(evt)) {
        dispatch(action());
      }
    };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleEscKeyPress);
    return () => {
      document.body.style.overflow = 'visible';
      document.removeEventListener('keydown', handleEscKeyPress);
    };
  },[dispatch, action]);

};
