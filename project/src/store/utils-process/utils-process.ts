import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { MessageType } from '../../types/message';
import { UtilsProcess } from '../../types/state';


export const utilsInitialState: UtilsProcess = {
  showMessage: false,
  showReview: false,
  showSuccess: false,
  showCart: false,
  message: {} as MessageType,
  currentPage: 0,
  paramsSetup: '' as unknown,
  paramsUpdate: false,
  pageUpdate: true,
};

export const utilsProcess = createSlice({
  name: NameSpace.Utils,
  initialState: utilsInitialState,
  reducers: {
    pageUpdateSetter(state, action) {
      state.pageUpdate = action.payload as boolean;
    },
    paramsSetter(state, action) {
      state.paramsSetup = action.payload as unknown;
      state.paramsUpdate = !state.paramsUpdate;
    },
    pageSetter(state, action) {
      state.currentPage = action.payload as number;
    },
    errorMessageCompiler(state, action) {
      state.message = action.payload as MessageType;
    },
    reviewToggler(state) {
      state.showReview = !state.showReview;
    },
    messageToggler(state) {
      state.showMessage = !state.showMessage;
    },
    succesToggler(state) {
      state.showSuccess = !state.showSuccess;
    },
    cartToggler(state) {
      state.showCart = !state.showCart;
    }
  },
});

export const {pageUpdateSetter, paramsSetter, pageSetter, errorMessageCompiler, messageToggler, reviewToggler, succesToggler, cartToggler} = utilsProcess.actions;
export default utilsProcess.reducer;
