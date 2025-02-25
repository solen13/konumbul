import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  value: authState;
};
type authState = {
  userName: String;
};
const initialState = {
  value: {
    userName: '',
  } as authState,
} as InitialState;

export const auths = createSlice({
  name: 'cordinate',
  initialState: initialState,
  reducers: {},
});
