import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface FavouritesState {
  favouriteItems: string[];
}

const initialState: FavouritesState = {
  favouriteItems: [],
};

export const FavouriteItems = createSlice({
  name: 'favouriteItem',
  initialState,
  reducers: {
    addFavouriteItem(state, action: PayloadAction<string>) {
      state.favouriteItems = [...state.favouriteItems, action.payload];
    },
    removeFromFavourites(state, action: PayloadAction<string>) {
      state.favouriteItems = state.favouriteItems.filter(itemId => itemId !== action.payload);
    },
  },
});

export const favouriteItems = (state: RootState) => state.cartItems;
export const { addFavouriteItem, removeFromFavourites } = FavouriteItems.actions;
export default FavouriteItems.reducer;
