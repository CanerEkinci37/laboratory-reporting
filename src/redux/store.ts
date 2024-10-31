import { configureStore } from '@reduxjs/toolkit';
import laborantModalReducer from './laborantModalSlice';
import laborantDataReducer from './laborantDataSlice';
import reportModalReducer from './reportModalSlice';
import reportDataReducer from './reportDataSlice';

const store = configureStore({
  reducer: {
    laborantModal: laborantModalReducer,
    laborantData: laborantDataReducer,
    reportModal: reportModalReducer,
    reportData: reportDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
