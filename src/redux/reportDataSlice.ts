
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReportType } from '../types/Report';

interface ReportDataState {
    data: ReportType[];
    keyword: string;
}

const initialState: ReportDataState = {
    data: [],
    keyword: ''
};

const reportDataSlice = createSlice({
  name: 'reportData',
  initialState,
  reducers: {
    createReportFunc(state, action: PayloadAction<ReportType>) {
        state.data = [...state.data, action.payload];
    },
    deleteReportFunc(state, action: PayloadAction<number>) {
        state.data = state.data.filter(dt => dt.id !== action.payload);
    },
    updateReportFunc(state, action: PayloadAction<ReportType>) {
        state.data = state.data.map(dt =>
            dt.id === action.payload.id ? { ...dt, ...action.payload } : dt
        );
    },
    sortReportFunc(state, action: PayloadAction<'asc' | 'desc'>) {
        state.data.sort((a, b) => {
            const dateA = new Date(a.reportDate).getTime();
            const dateB = new Date(b.reportDate).getTime();
            return action.payload === 'asc' ? dateA - dateB : dateB - dateA;
        });
    },
    searchReportFunc(state, action: PayloadAction<string>) {
        state.keyword = action.payload;
    }
  },
});

export const { createReportFunc, deleteReportFunc, updateReportFunc, sortReportFunc, searchReportFunc } = reportDataSlice.actions;

export default reportDataSlice.reducer;
