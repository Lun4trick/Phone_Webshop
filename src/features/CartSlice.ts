import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface CartState {
  cartItems: string[];
}

const initialState: CartState = {
  cartItems: [],
};

export const Cartslice = createSlice({
  name: 'cartItem',
  initialState,
  reducers: {
    addCartItem(state, action: PayloadAction<string>) {
      state.cartItems = [...state.cartItems, action.payload];
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.cartItems = state.cartItems.filter(itemId => itemId !== action.payload);
    },
  },
});

export const cartItems = (state: RootState) => state.cartItems;
export const { addCartItem, removeFromCart } = Cartslice.actions;
export default Cartslice.reducer;
