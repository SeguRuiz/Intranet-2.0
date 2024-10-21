import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contenidos_tareas: [],
  tareas_asignadas: [],
};

const datos_tarea = createSlice({
  name: "datos_tarea",
  initialState,
  reducers: {
    pushContenidoTareas: (state, action) => {
      state.contenidos_tareas.push(action.payload);
    },
    setDatos: (state, action) => {
      state.contenidos_tareas = action.payload;
    },
    deleteContenidosTareas: (state, action) => {
      const { id } = action.payload;
      const ContentFiltered = [...state.contenidos_tareas].filter(
        (contenidos) => contenidos.id != id
      );
      state.contenidos_tareas = ContentFiltered;
    },
    subirArchivosTareas: (state, action) => {
      const { id_tareas_asignadas, data_tareas } = action.payload;
      state.tareas_asignadas.forEach((e) => {
        if (e.id == id_tareas_asignadas) {
          e.archivo = data_tareas.id;
        }
      });
    },
  },
});

export const {
  pushContenidoTareas,
  setDatos,
  deleteContenidosTareas,
  subirArchivosTareas,
} = datos_tarea.actions;
export default datos_tarea.reducer;
