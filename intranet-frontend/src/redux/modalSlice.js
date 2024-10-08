import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cursos: [],
  nombre: "",
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
      state.cursos.unshift(action.payload);
    },
    setData: (state, action) => {
      state.cursos = action.payload;
    },
    
  },
});

export const { openModal, closeModal, setCursos, setData } = modalState.actions;
export default modalState.reducer;
