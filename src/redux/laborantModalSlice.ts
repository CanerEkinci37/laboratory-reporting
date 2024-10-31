import { createSlice } from '@reduxjs/toolkit';

interface LaborantModalState {
  modal: boolean;
}

const initialState: LaborantModalState = {
  modal: false,
};

const laborantModalSlice = createSlice({
  name: 'laborantModal',
  initialState,
  reducers: {
    laborantModalFunc(state) {
      state.modal = !state.modal;
    },
  },
});

export const { laborantModalFunc } = laborantModalSlice.actions;

export default laborantModalSlice.reducer;
