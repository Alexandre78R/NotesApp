import { createSlice } from "@reduxjs/toolkit";

const auth = createSlice({
  name: "auth",
  initialState: { user: null, isLogged: false },
  reducers: {
    signin: (state, action) => ({
      ...state,
      user: action.payload,
      isLogged: true,
    }),
    logout: (state) => ({ ...state, user: null, isLogged: false }),
  },
});

export const { signin, logout } = auth.actions;

export default auth.reducer;