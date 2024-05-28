import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/authSlice"; // Import your auth slice
import clientSlice from "./clientSlice/clientSlice"; // Import your auth slice
import profileReducer from "./authSlice/profileSlice";
import activeUserSlice from "./switchSlice/switchSlice";
import pagesReducer from "./pagesSlice/pagesSlice";

const store = configureStore({
  reducer: {
    auth: authReducer, // Add the auth slice to your store
    profile: profileReducer,
    client: clientSlice,
    activeagency: activeUserSlice,
    pages: pagesReducer,
  },
});

export default store;
