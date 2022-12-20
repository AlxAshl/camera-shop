import { NameSpace } from '../../const';
import { MessageType } from '../../types/message';
import { State } from '../../types/state';


export const getMessageVisibilityStatus = (state: State): boolean => state[NameSpace.Utils].showErrorMessage;
export const getMessageContent = (state: State): MessageType => state[NameSpace.Utils].message;
export const getPage = (state: State): number => state[NameSpace.Utils].currentPage;

