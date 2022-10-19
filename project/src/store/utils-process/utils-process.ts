import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { MessageType } from '../../types/message';
import { UtilsProcess } from '../../types/state';


const initialState: UtilsProcess = {
  showMessage: false,
  showReview: false,
  showSuccess: false,
  message: {} as MessageType,
};

export const utilsProcess = createSlice({
  name: NameSpace.Utils,
  initialState,
  reducers: {
    formMessage(state, action) {
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
  },
});

export const {formMessage, toggleMessage, toggleReview, toggleSuccess} = utilsProcess.actions;
