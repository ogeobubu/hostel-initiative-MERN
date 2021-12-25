import { createSlice } from "@reduxjs/toolkit";

export const accomodationsSlice = createSlice({
  name: "accomodations",
  initialState: {
    accomodations: [],
    getAllAccomodations: [],
    getAllUserAccomodations: [],
  },
  reducers: {
    dispatchAccomodations: (state, action) => {
      state.accomodations = action.payload;
    },

    dispatchAllAccomodations: (state, action) => {
      state.getAllAccomodations = action.payload;
    },

    dispatchUserAllAccomodations: (state, action) => {
      state.getAllUserAccomodations = action.payload;
    },
  },
});

export const {
  dispatchAccomodations,
  dispatchAllAccomodations,
  dispatchUserAllAccomodations,
} = accomodationsSlice.actions;
export default accomodationsSlice.reducer;
