import { NameSpace } from '../../const';
import { MessageType } from '../../types/message';
import { State } from '../../types/state';

export const getMessageVisibilityStatus = (state: State): boolean => state[NameSpace.Ui].showMessage;
export const getMessageContent = (state: State): MessageType => state[NameSpace.Ui].message;
