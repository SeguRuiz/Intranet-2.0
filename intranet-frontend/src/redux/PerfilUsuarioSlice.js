import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  PerfilUrl: null,
  
};

const PerfilUsuario = createSlice({
  name: "PerfilUsuario",
  initialState,
  reducers: {
    setPerfilUrl: (state, action) => {
      state.PerfilUrl = action.payload;
    },
   
  },
});

export const { setPerfilUrl } = PerfilUsuario.actions;
export default PerfilUsuario.reducer;
