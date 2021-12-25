import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./navSlice";
import userReducer from "./userSlice";
import accomodationsReducer from "./accomodationsSlice";

export default configureStore({
  reducer: {
    navbar: navReducer,
    user: userReducer,
    accomodations: accomodationsReducer,
  },
});
