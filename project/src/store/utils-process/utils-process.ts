import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { MessageType } from '../../types/message';
import { UtilsProcess } from '../../types/state';


export const utilsInitialState: UtilsProcess = {
  showErrorMessage: false,
  message: {} as MessageType,
  currentPage: 0,
};

export const utilsProcess = createSlice({
  name: NameSpace.Utils,
  initialState: utilsInitialState,
  reducers: {
    pageSetter(state, action) {
      state.currentPage = action.payload as number;
    },
    errorMessageCompiler(state, action) {
      state.message = action.payload as MessageType;
    },
    messageToggler(state) {
      state.showErrorMessage = !state.showErrorMessage;
    },
  },
});

export const { pageSetter, errorMessageCompiler, messageToggler,} = utilsProcess.actions;
export default utilsProcess.reducer;
