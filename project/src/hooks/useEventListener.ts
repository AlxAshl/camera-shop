import { useEffect } from 'react';
import { useAppDispatch } from '.';
import { toggleReview, toggleSuccess } from '../store/utils-process/utils-process';

type ToggleModalType = {
  isReviewActive?: boolean;
  isSuccessActive?: boolean;
}

export const useEventListener = ({...props}: ToggleModalType) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const isEscapeKey = (evt:KeyboardEvent) => evt.key === 'Escape';
    const handleEscKeyPress = (evt: KeyboardEvent) => {
      if(isEscapeKey(evt)) {
        if(props.isReviewActive){
          dispatch(toggleReview());
        }
        if(props.isSuccessActive){
          dispatch(toggleSuccess());
        }
      }
    };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleEscKeyPress);
    return () => {
      document.body.style.overflow = 'visible';
      document.removeEventListener('keydown', handleEscKeyPress);
    };
  },[dispatch, props]);
};