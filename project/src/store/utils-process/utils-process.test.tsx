import { cleanup } from '@testing-library/react';
import { messageMock } from '../../test/test-mocks';
import { MessageType } from '../../types/message';
import { store } from '../store';
import reducer, { errorMessageCompiler } from './utils-process';

describe('Reducer: utilsProcess', () => {
  beforeAll(()=>{
    store.getState();
    cleanup();
  });
  test('without additional parameters should return initial state', () => {
    expect(reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        showErrorMessage: false,
        message: {} as MessageType,
        currentPage: 0,
      });
  });

  test('should get message content after network error', () => {
    const state = {
      showErrorMessage: false,
      message: {} as MessageType,
      currentPage: 1,
    };
    expect(reducer(state, {type: errorMessageCompiler, payload: messageMock}))
      .toEqual({
        showErrorMessage: false,
        message: messageMock as MessageType,
        currentPage: 1,
      });
  });
});
