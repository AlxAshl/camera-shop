import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { MessageType } from '../../types/message';
import { UiProcess } from '../../types/state';


const initialState: UiProcess = {
  showMessage: false,
  message: {} as MessageType
};

export const uiProcess = createSlice({
  name: NameSpace.Ui,
  initialState,
  reducers: {
    formMessage(state, action) {
      state.message = action.payload as MessageType;
    },
    toggleMessage(state) {
      state.showMessage = !state.showMessage;
    }
  },
});

export const {formMessage, toggleMessage} = uiProcess.actions;
