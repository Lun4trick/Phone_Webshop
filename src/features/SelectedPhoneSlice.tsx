/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../app/store';
import { ExtendedPhone } from '../utils/types/ExtendedPhone';

export interface Phone {
  phone: ExtendedPhone | null;
  status: 'idle' | 'loading' | 'failed';
}
const initialState: Phone = {
  phone: null,
  status: 'idle'
};

export const selectPhone = createAsyncThunk(
  'phones/selectPhone',
  (async (phoneId) => {
    const response = await axios.get(`https://phone-catalog-bcknd.onrender.com/data/${phoneId}`);

    return response.data;
  })
);

export const selectedPhoneSlice = createSlice({
  name: 'phone',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(selectPhone.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(selectPhone.fulfilled, (state, action) => {
        state.status = 'idle';
        state.phone = action.payload;
      })
      .addCase(selectPhone.rejected, (state) => {
        state.status = 'failed';
      });
  }
});

export const setSelectedPhone = (state: RootState) => state.selectedPhone;
export default selectedPhoneSlice.reducer;