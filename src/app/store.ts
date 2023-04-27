import { configureStore, type ThunkAction, type Action } from '@reduxjs/toolkit';
import PhonesSlice from '../features/PhonesSlice';
import SelectedPhoneSlice from '../features/SelectedPhoneSlice';
import CartSlice from '../features/CartSlice';
import FavouritesSlice from '../features/FavouritesSlice';
import TotalCostSlice from '../features/TotalCostSlice';

export const store = configureStore({
  reducer: {
    allPhones: PhonesSlice,
    selectedPhone: SelectedPhoneSlice,
    cartItems: CartSlice,
    favouriteItems: FavouritesSlice,
    totalCost: TotalCostSlice,
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
