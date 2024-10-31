import { createSlice } from '@reduxjs/toolkit';

interface ReportModalState {
  modal: boolean;
}

const initialState: ReportModalState = {
  modal: false,
};

const reportModalSlice = createSlice({
  name: 'reportModal',
  initialState,
  reducers: {
    reportModalFunc(state) {
      state.modal = !state.modal;
    },
  },
});

export const { reportModalFunc } = reportModalSlice.actions;

export default reportModalSlice.reducer;
