import { cleanup } from '@testing-library/react';
import { messageMock } from '../../test/test-mocks';
import { MessageType } from '../../types/message';
import { store } from '../store';
import reducer, { formErrorMessage } from './utils-process';

describe('Reducer: utilsProcess', () => {
  beforeAll(()=>{
    store.getState();
    cleanup();
  });
  test('without additional parameters should return initial state', () => {
    expect(reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        showMessage: false,
        showReview: false,
        showSuccess: false,
        showCart: false,
        message: {} as MessageType,
      });
  });

  test('should get message content after network error', () => {
    const state = {
      showMessage: false,
      showReview: false,
      showSuccess: false,
      showCart: false,
      message: {} as MessageType,
    };
    expect(reducer(state, {type: formErrorMessage, payload: messageMock}))
      .toEqual({
        showMessage: false,
        showReview: false,
        showSuccess: false,
        showCart: false,
        message: messageMock as MessageType,
      });
  });
});
