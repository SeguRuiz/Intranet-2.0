import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fetching_state: false
};

const Fetchs = createSlice({
  name: "Fetchs",
  initialState,
  reducers: {
    set_fetching : (state, action) => {
      state.fetching_state = action.payload
      
    }
  },
});

export const { set_fetching} =
  Fetchs.actions;
export default Fetchs.reducer;
