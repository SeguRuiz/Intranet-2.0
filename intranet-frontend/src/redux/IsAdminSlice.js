import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Es_admin: true,
};

const IsAdmin = createSlice({
  name: "IsAdmin",
  initialState,
  reducers: {
    estado_admin : (state) => {
      state.Es_admin = true
    },
    estado_no_admin : (state) => {
        state.Es_admin = false
    }
  },
});

export const { estado_admin, estado_no_admin} =
  IsAdmin.actions;
export default IsAdmin.reducer;
