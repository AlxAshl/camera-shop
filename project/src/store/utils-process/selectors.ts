import { NameSpace } from '../../const';
import { MessageType } from '../../types/message';
import { State } from '../../types/state';

export const getMessageVisibilityStatus = (state: State): boolean => state[NameSpace.Utils].showMessage;
export const getMessageContent = (state: State): MessageType => state[NameSpace.Utils].message;
export const getModalVisibilityStatus = (state: State): boolean => state[NameSpace.Utils].showReview;
export const getModalSuccessVisibilityStatus = (state: State): boolean => state[NameSpace.Utils].showSuccess;
export const getModalCartVisibilityStatus = (state: State): boolean => state[NameSpace.Utils].showCart;
export const getPage = (state: State): number => state[NameSpace.Utils].currentPage;
export const getParamsUpdateStatus = (state: State): boolean => state[NameSpace.Utils].paramsUpdate;
export const getParams = (state: State): unknown => state[NameSpace.Utils].paramsSetup;
export const getCleanUpStatus = (state: State): boolean => state[NameSpace.Utils].cleanPrice;
