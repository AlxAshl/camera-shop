import { NameSpace } from '../../const';
import { MessageType } from '../../types/message';
import { State } from '../../types/state';

export const getMessageVisibilityStatus = (state: State): boolean => state[NameSpace.Utils].showMessage;
export const getMessageContent = (state: State): MessageType => state[NameSpace.Utils].message;
export const getModalVisibilityStatus = (state: State): boolean => state[NameSpace.Utils].showReview;
export const getModalSuccessVisibilityStatus = (state: State): boolean => state[NameSpace.Utils].showSuccess;
