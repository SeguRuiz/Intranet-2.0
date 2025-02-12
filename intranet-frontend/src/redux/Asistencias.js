import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  estudiantesDelDia: [],
  informeAsubir: [],
};

const Asistencias = createSlice({
  name: "Asistencias",
  initialState,
  reducers: {
    setEstudiantesDelDia: (state, action) => {
      state.estudiantesDelDia = action.payload;
    },
    add_informe_a_subir: (state, action) => {
      const { id, nuevoEstado, nombre, info = {} } = action.payload;
      const informeAsubirExistente = state.informeAsubir.find(
        (x) => x.id == id
      );

      if (informeAsubirExistente) {
        state.informeAsubir.forEach((x) => {
          if (x.id == id) {
            x.estado = nuevoEstado;
            x.info.estado = nuevoEstado;
          }
        });
      } else {
        state.informeAsubir.push({
          id: id,
          estado: nuevoEstado,
          nombre: nombre,
          info: info,
          presento_aviso: false,
        });
      }
    },
    setInformeAsubir: (state, action) => {
      state.informeAsubir = action.payload;
    },
    set_presento_aviso: (state, action) => {
      const { id, presento_aviso } = action.payload;
      state.informeAsubir[
        state.informeAsubir.findIndex((x) => x.id == id)
      ].info.presento_aviso = presento_aviso;
    },
  },
});

export const { setEstudiantesDelDia, add_informe_a_subir, setInformeAsubir, set_presento_aviso } =
  Asistencias.actions;
export default Asistencias.reducer;
