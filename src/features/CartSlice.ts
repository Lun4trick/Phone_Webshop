import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

type CartItem = {
  name: string;
  count: number;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface CartState {
  cartItems: CartItem[];
}

const initialState: CartState = {
  cartItems: [],
};

export const Cartslice = createSlice({
  name: 'cartItem',
  initialState,
  reducers: {
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
export const { addCartItem, removeFromCart } = Cartslice.actions;
export default Cartslice.reducer;
