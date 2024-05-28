// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Function to get cookie by name
function getCookie(name) {
  if (typeof document !== 'undefined') {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
}


const getCookieAuthData = () => {
  const role = getCookie("role") || "";
  const authtoken = getCookie("authtoken") || "";
  return { role, authtoken };
};

const initialState = getCookieAuthData();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      const { role, authtoken } = action.payload;
      state.role = role;
      state.authtoken = authtoken;
      document.cookie = `role=${role}`;
      document.cookie = `authtoken=${authtoken}`;
    },
    clearAuthData: (state) => {
      state.role = "";
      state.authtoken = "";
      document.cookie = "role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "authtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    },
  },
});

export const { setAuthData, clearAuthData } = authSlice.actions;

export default authSlice.reducer;
