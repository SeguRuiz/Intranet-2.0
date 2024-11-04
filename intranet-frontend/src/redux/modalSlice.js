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
    eliminar_curso: (state, action) =>{
      const {curso_id} = action.payload

      const cursos_filtrados = state.cursos.filter(x => x.id != curso_id)

      state.cursos = cursos_filtrados
    }
  },
});

export const { openModal, closeModal, setCursos, setData, eliminar_curso } = modalState.actions;
export default modalState.reducer;
