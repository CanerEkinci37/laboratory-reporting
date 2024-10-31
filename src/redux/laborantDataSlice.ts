import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LaborantType } from '../types/Laborant';

interface LaborantDataState {
    data: LaborantType[];
}

const initialState: LaborantDataState = {
    data: []
};

const laborantDataSlice = createSlice({
  name: 'laborantData',
  initialState,
  reducers: {
    createLaborantFunc(state, action: PayloadAction<LaborantType>) {
        state.data = [...state.data, action.payload];
    },
  },
});

export const { createLaborantFunc } = laborantDataSlice.actions;

export default laborantDataSlice.reducer;
