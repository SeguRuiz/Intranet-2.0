import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contenidos: [],
};

const datos_tarea = createSlice({
  name: "datos_tarea",
  initialState,
  reducers: {
    pushContenidoTareas: (state, action) => {
      state.contenidos.push(action.payload);
    },
  },
});

export const { pushContenidoTareas } = datos_tarea.actions;
export default datos_tarea.reducer;
