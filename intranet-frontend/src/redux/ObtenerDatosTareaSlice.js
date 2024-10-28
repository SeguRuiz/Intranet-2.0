import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contenidos_tareas: [],
  tareas_asignadas: [],
  archivo_mostrandose: null,
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
    set_archivo_mostrandose: (state, action) => {
      state.archivo_mostrandose = action.payload;
    },
    borrar_archivos_contenidos: (state, action) => {
      const { contenido_id } = action.payload;

      const contenidos_copy = [...state.Contenidos];

      contenidos_copy.forEach((e) => {
        if (e.id == contenido_id) {
          x.archivo = null;
        }
      });

      state.Contenidos = contenidos_copy;
    },
  },
});

export const {
  pushContenidoTareas,
  setDatos,
  deleteContenidosTareas,
  subirArchivosTareas,
  set_archivo_mostrandose,
  borrar_archivos_contenidos,
} = datos_tarea.actions;
export default datos_tarea.reducer;
