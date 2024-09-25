import { configureStore } from "@reduxjs/toolkit";
import default_state from './stateSlice'
export const store = configureStore({
  reducer: {
    default: default_state
  },
});
