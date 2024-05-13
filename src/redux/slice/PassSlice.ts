import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {};

export const PassSlice = createSlice({
  name: "PassSlice",
  initialState,
  reducers: {
    reset: () => initialState,
  },
});

export const {reset} = PassSlice.actions;
export default PassSlice.reducer;


