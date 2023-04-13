/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-cycle */
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import PhonesSlice from '../features/PhonesSlice';
import SelectedPhoneSlice from '../features/SelectedPhoneSlice';

export const store = configureStore({
  reducer: {
    allPhones: PhonesSlice,
    selectedPhone: SelectedPhoneSlice
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
/* eslint-disable @typescript-eslint/indent */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
