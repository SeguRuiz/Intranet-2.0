import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: 'Hello world'
};

const default_state = createSlice({
  name: "default",
  initialState,
  reducers: {
    change_state : (state) => {
      state.message = 'goodbye world'
    }
  },
});

export const { change_state} =
  default_state.actions;
export default default_state.reducer;
