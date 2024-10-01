import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Token: "",
  se_guardo: false
};

const TokenState = createSlice({
  name: "Token",
  initialState,
  reducers: {
    setToken: (state, action) => {
      const { Token } = action.payload;
      state.Token = Token;
    },
  },
});

export const { setToken } = TokenState.actions;
export default TokenState.reducer;
