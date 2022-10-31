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
};

export const utilsProcess = createSlice({
  name: NameSpace.Utils,
  initialState: utilsInitialState,
  reducers: {
    formErrorMessage(state, action) {
      state.message = action.payload as MessageType;
    },
    toggleReview(state) {
      state.showReview = !state.showReview;
    },
    toggleMessage(state) {
      state.showMessage = !state.showMessage;
    },
    toggleSuccess(state) {
      state.showSuccess = !state.showSuccess;
    },
    toggleCart(state) {
      state.showCart = !state.showCart;
    }
  },
});

export const {formErrorMessage, toggleMessage, toggleReview, toggleSuccess, toggleCart} = utilsProcess.actions;
export default utilsProcess.reducer;
