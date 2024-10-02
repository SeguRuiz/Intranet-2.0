import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Contenidos: [],
};

const CursosContenidos = createSlice({
  name: "CursosContenidos",
  initialState,
  reducers: {
    setContenidos: (state, action) => {
      state.Contenidos = action.payload;
    },
    pushContenidos: (state, action) => {
      state.Contenidos.push(action.payload);
    },
  },
});

export const { setContenidos, pushContenidos } = CursosContenidos.actions;
export default CursosContenidos.reducer;
