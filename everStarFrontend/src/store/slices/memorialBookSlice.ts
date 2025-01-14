import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MemorialBookDetailsResponse } from 'api/memorialBookApi';

interface MemorialBookState {
  memorialBookDetails: MemorialBookDetailsResponse | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: MemorialBookState = {
  memorialBookDetails: null,
  isLoading: false,
  error: null,
};

const memorialBookSlice = createSlice({
  name: 'memorialBook',
  initialState,
  reducers: {
    setMemorialBookDetails: (state, action: PayloadAction<MemorialBookDetailsResponse>) => {
      state.memorialBookDetails = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setLoading: (state) => {
      state.isLoading = true;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { setMemorialBookDetails, setLoading, setError } = memorialBookSlice.actions;
export default memorialBookSlice.reducer;
