import { configureStore } from "@reduxjs/toolkit";
import default_state from './stateSlice'
import tokenSlice from './tokenSlice'
export const store = configureStore({
  reducer: {
    default: default_state,
    Token: tokenSlice
  },
});
