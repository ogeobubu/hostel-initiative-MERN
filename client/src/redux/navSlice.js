import { createSlice } from "@reduxjs/toolkit";

export const navSlice = createSlice({
  name: "navbar",
  initialState: {
    open: false,
  },
  reducers: {
    openNav: (state, action) => {
      state.open = !state.open;
    },
  },
});

export const { openNav } = navSlice.actions;
export default navSlice.reducer;
