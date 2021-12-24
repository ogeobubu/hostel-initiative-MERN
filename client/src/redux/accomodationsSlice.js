import { createSlice } from "@reduxjs/toolkit";

export const accomodationsSlice = createSlice({
  name: "accomodations",
  initialState: {
    accomodations: [],
    getAllAccomodations: [],
  },
  reducers: {
    dispatchAccomodations: (state, action) => {
      state.accomodations = action.payload;
    },

    dispatchAllAccomodations: (state, action) => {
      state.getAllAccomodations = action.payload;
    },
  },
});

export const {
  dispatchAccomodations,
  dispatchAllAccomodations,
} = accomodationsSlice.actions;
export default accomodationsSlice.reducer;
