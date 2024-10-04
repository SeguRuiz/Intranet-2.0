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
    deleteContenidos: (state, action) => {
      const { id } = action.payload;
      const ContentFiltered = [...state.Contenidos].filter(
        (contenidos) => contenidos.id != id
      );
      state.Contenidos = ContentFiltered;
    },
    addSubcontenido: (state, action) => {
      const {contenido_id, data} = action.payload
      const contenidos_copy = [...state.Contenidos]
      contenidos_copy.forEach(e => {
        if (e.id == contenido_id){
            e.subcontenidos.push(data)
        }
      })
      state.Contenidos = contenidos_copy
    }
  },
});

export const { setContenidos, pushContenidos, deleteContenidos, addSubcontenido } =
  CursosContenidos.actions;
export default CursosContenidos.reducer;
