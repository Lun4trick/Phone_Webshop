import { configureStore, type ThunkAction, type Action } from '@reduxjs/toolkit';
import PhonesSlice from '../features/PhonesSlice';
import SelectedPhoneSlice from '../features/SelectedPhoneSlice';
import CartSlice from '../features/CartSlice';
import FavouritesSlice from '../features/FavouritesSlice';

export const store = configureStore({
  reducer: {
    allPhones: PhonesSlice,
    selectedPhone: SelectedPhoneSlice,
    cartItems: CartSlice,
    favouriteItems: FavouritesSlice,
  },
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
