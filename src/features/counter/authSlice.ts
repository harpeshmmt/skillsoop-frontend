import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  tokens: {
    access: "",
    refresh: "",
  },
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      state.user = action.payload.user;
      state.tokens = action.payload.tokens;
      state.isAuthenticated = true;
    },
    clearAuthData: (state) => {
      state.user = null;
      state.tokens = {
        access: "",
        refresh: "",
      };
      state.isAuthenticated = false;
    },
  },
});

export const { setAuthData, clearAuthData } = authSlice.actions;
export default authSlice.reducer;
