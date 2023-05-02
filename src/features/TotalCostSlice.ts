import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type RootState } from '../app/store';

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
    setAmount(state, action: PayloadAction<number>) {
      state.totalCost = action.payload;
    },
  },
});

export const totalCost = (state: RootState) => state.totalCost;
export const { setAmount } = TotalCostSlice.actions;
export default TotalCostSlice.reducer;
