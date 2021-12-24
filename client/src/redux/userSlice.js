import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogged: false,
    token: "",
    user: {},
  },
  reducers: {
    dispatchIsLogged: (state, action) => {
      state.isLogged = true;
    },
    dispatchUserToken: (state, action) => {
      state.token = action.payload;
    },
    dispatchUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { dispatchIsLogged, dispatchUserToken, dispatchUser } =
  userSlice.actions;
export default userSlice.reducer;
