import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cursos: ["hola"],
  nombre: "Hola",
  URL: null,
};

const modalState = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      const { nombre, URL } = action.payload;
      state.nombre = nombre;
      state.URL = URL;
    },
    closeModal: (state) => {
      state.nombre = null;
      state.URL = null;
    },
    setCursos: (state, action) => {
      state.cursos.push(action.payload);
    },
  },
});

export const { openModal, closeModal, setCursos } = modalState.actions
export default modalState.reducer;
