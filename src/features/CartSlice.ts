import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type RootState } from '../app/store';
import type CartItemType from '../utils/types/CartItemType';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface CartState {
  cartItems: CartItemType[];
}

const initialState: CartState = {
  cartItems: [],
};

export const Cartslice = createSlice({
  name: 'cartItem',
  initialState,
  reducers: {
    setAllFromStorage(state, action: PayloadAction<CartItemType[]>) {
      state.cartItems = action.payload;
    },

    removeAllFromCart(state, action: PayloadAction<string>) {
      state.cartItems = state.cartItems.filter(({ name }) => name !== action.payload);
    },

    addCartItem(state, action: PayloadAction<string>) {
      const { cartItems } = state;

      if (cartItems.some(({ name }) => name === action.payload)) {
        const indexOfProduct = cartItems.findIndex(({ name }) => name === action.payload);
        state.cartItems[indexOfProduct].count += 1;
      } else {
        state.cartItems = [...state.cartItems, { name: action.payload, count: 1 }];
      }
    },

    removeFromCart(state, action: PayloadAction<string>) {
      const { cartItems } = state;

      if (cartItems.some(({ name }) => name === action.payload)) {
        const indexOfProduct = cartItems.findIndex(({ name }) => name === action.payload);
        state.cartItems[indexOfProduct].count -= 1;
      } else {
        state.cartItems = [...state.cartItems, { name: action.payload, count: 1 }];
      }
    },
  },
});

export const cartItems = (state: RootState) => state.cartItems;
export const { addCartItem, removeFromCart, setAllFromStorage, removeAllFromCart } = Cartslice.actions;
export default Cartslice.reducer;
