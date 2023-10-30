import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProductPhotoInt } from '../../types';

export interface Photostate {
  photos: ProductPhotoInt[],
  photosLoading: boolean;
  photosError: string;
}

const initialState: Photostate = {
  photos: [],
  photosLoading: false,
  photosError: '',
};

export const photoslice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    getphotos: (state: Photostate) => {
      state.photosLoading = true;
    },
    getphotosSuccess: (state: Photostate, action: PayloadAction<ProductPhotoInt[]>) => {
      state.photos = action.payload;
      state.photosLoading = false;
      state.photosError = '';
    },
    getphotosError: (state: Photostate, action: PayloadAction<string>) => {
      state.photos = [];
      state.photosError = action.payload;
      state.photosLoading = false;
    },
  },
});

export const { getphotosError, getphotos, getphotosSuccess } = photoslice.actions;

export default photoslice.reducer;