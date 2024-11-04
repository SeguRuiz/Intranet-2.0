import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contenidos_tareas: [],
  tareas_asignadas_api: [],
  tareas_asignadas: [],
  tareas_subidas: [],
  archivo_mostrandose: null,
};

const datos_tarea = createSlice({
  name: "datos_tarea",
  initialState,
  reducers: {
    pushContenidoTareas: (state, action) => {
      state.contenidos_tareas.push(action.payload);
    },
    pushTareasAsignadas: (state, action) => {
      state.tareas_asignadas_api.push(action.payload);
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
    borrarArchivos: (state, action) => {
      const { id } = action.payload;
      const tareas_borradas = state.tareas_asignadas.filter(
        (contenidos) => contenidos.id !== id
      );
      state.tareas_asignadas = tareas_borradas;
    },

    subirArchivosTareas: (state, action) => {
      const { id_tareas_asignadas, data_tareas } = action.payload;
      state.tareas_asignadas.forEach((e) => {
        if (e.id == id_tareas_asignadas) {
          e.archivo = data_tareas.id;
        }
      });
    },
    subirArchivosTareasEstudiantes: (state, action) => {
      const { id_tareas_asignadas, data_tareas } = action.payload;
      state.tareas_subidas.forEach((e) => {
        if (e.id == id_tareas_asignadas) {
          e.archivo = data_tareas.id;
        }
      });
    },
    set_archivo_mostrandose: (state, action) => {
      state.archivo_mostrandose = action.payload;
    },
  },
});

export const {
  pushContenidoTareas,
  setDatos,
  deleteContenidosTareas,
  subirArchivosTareas,
  set_archivo_mostrandose,
  pushTareasAsignadas,
  subirArchivosTareasEstudiantes,
  borrarArchivos,
} = datos_tarea.actions;
export default datos_tarea.reducer;
