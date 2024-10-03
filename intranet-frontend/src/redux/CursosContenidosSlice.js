import { createSlice } from "@reduxjs/toolkit";
import { get } from "../services/llamados";
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
    deleteContenidos: (state, action) => {
      const { id } = action.payload;
      const ContentFiltered = [...state.Contenidos].filter(
        (contenidos) => contenidos.id != id
      );
      state.Contenidos = ContentFiltered;
    },
  },
});

export const { setContenidos, pushContenidos, deleteContenidos } =
  CursosContenidos.actions;
export default CursosContenidos.reducer;
