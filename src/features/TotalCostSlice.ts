import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface TotalCostState {
  totalCost: number;
}

const initialState: TotalCostState = {
  totalCost: 0,
};

export const TotalCostSlice = createSlice({
  name: 'totalCost',
  initialState,
  reducers: {
    addAmount(state, action: PayloadAction<number>) {
      state.totalCost += action.payload;
    },
    reduceAmount(state, action: PayloadAction<number>) {
      state.totalCost -= action.payload;
    },
  },
});

export const totalCost = (state: RootState) => state.totalCost;
export const { addAmount, reduceAmount } = TotalCostSlice.actions;
export default TotalCostSlice.reducer;
