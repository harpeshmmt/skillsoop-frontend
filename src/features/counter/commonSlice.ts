import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allcountries: [],
};

export const countriesSlice = createSlice({
  name: "country",
  initialState,
  reducers: {
    addcountries: (state, action) => {
      state.allcountries = action.payload;
    },
  },
});

export const { addcountries } = countriesSlice.actions;

export default countriesSlice.reducer;
