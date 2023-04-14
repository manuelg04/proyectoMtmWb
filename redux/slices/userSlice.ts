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
    SaveName: (state, action: PayloadAction<string>) => {
      state.name += action.payload;
    },
    SaveDocument: (state, action: PayloadAction<string>) => {
      state.document += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  SaveName, SaveDocument,
} = userSlice.actions;

export default userSlice.reducer;
