import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../src/store';

export interface UserState {
  name: string;
  document: string;
}

const initialState: UserState = {
  name: '',
  document: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    name: (state, action: PayloadAction<string>) => {
      state.name += action.payload;
    },
    document: (state, action: PayloadAction<string>) => {
      state.document += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  increment, decrement, name, document,
} = userSlice.actions;

export default userSlice.reducer;
