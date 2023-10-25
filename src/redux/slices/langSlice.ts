import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface LangState {
  language: string
}

const initialState: LangState = {
  language: 'EN',
};

export const langSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    changeLang: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  },
});

export const { changeLang } = langSlice.actions;

export default langSlice.reducer;