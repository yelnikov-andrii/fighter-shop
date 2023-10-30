import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { CurrencyFromServerInt } from '../../types';

export interface CurrencyState {
  currency: string;
  currenciesArr: CurrencyFromServerInt[];
  currenciesError: string | null;
  coefficient: number;
}

const initialState: CurrencyState = {
  currency: '$',
  currenciesArr: [],
  currenciesError: null,
  coefficient: 1,
};

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    getCurrenciesSuccess: (state, action: PayloadAction<CurrencyFromServerInt[]>) => {
      state.currenciesArr = action.payload;
      state.currenciesError = '';
    },
    changeCurrency: (state, action: PayloadAction<string>) => {
      state.currency = action.payload.split(' ')[1];
      const usdRate = state.currenciesArr?.find(item => item.cc === 'USD')?.rate || 1;
      const foundCurrencyRate = state.currenciesArr.find(item => item.cc === action.payload.split(' ')[0])?.rate || 1;
      state.coefficient = usdRate / foundCurrencyRate;
    },
    getCurrenciesError: (state, action: PayloadAction<string>) => {
      state.currenciesError = action.payload;
      state.currenciesArr = [];
    }
  },
});

export const { changeCurrency, getCurrenciesError, getCurrenciesSuccess } = currencySlice.actions;

export default currencySlice.reducer;