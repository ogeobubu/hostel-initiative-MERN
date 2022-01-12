import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  // User Data State.
  initialState: {
    isLogged: false,
    token: "",
    user: {},
  },
  reducers: {
    // Function to login a user.
    dispatchIsLogged: (state) => {
      state.isLogged = true;
    },
    // Function to get user unique token.
    dispatchUserToken: (state, action) => {
      state.token = action.payload;
    },
    // Function to get user details.
    dispatchUser: (state, action) => {
      state.user = action.payload;
    },
    // Function to logout a user.
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
