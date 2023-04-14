import { RootState } from '../src/store';

export const selectValue = (state: RootState) => state.counter.value;
export const selectUserName = (state: RootState) => state.user.name;
export const selectUserDocument = (state: RootState) => state.user.document;

export const v = '';
