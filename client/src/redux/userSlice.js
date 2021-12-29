import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogged: false,
    token: "",
    user: {},
  },
  reducers: {
    dispatchIsLogged: (state) => {
      state.isLogged = true;
    },
    dispatchUserToken: (state, action) => {
      state.token = action.payload;
    },
    dispatchUser: (state, action) => {
      state.user = action.payload;
    },
    dispatchLogout: (state) => {
      state.isLogged = false;
    },
  },
});

export const {
  dispatchIsLogged,
  dispatchUserToken,
  dispatchUser,
  dispatchLogout,
} = userSlice.actions;
export default userSlice.reducer;
