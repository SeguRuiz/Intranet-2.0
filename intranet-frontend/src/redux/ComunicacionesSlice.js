import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  avisos: [],
  edit_com: false
};

const  Comunicaciones = createSlice({
  name: "Comunicaciones",
  initialState,
  reducers: {
   set_edit_com: (state,action) => {
    state.edit_com = action.payload
   },
   agregar_avisos: (state, action) => {
    state.avisos.unshift(action.payload)
   },
   eliminar_avisos: (state, action) => {
    const {id} = action.payload

    const avisos_filtrados = state.avisos.filter(x => x.id != id)

    state.avisos = avisos_filtrados
   },
   set_avisos: (state, action) => {
    state.avisos = action.payload
   },
  },
});

export const {agregar_avisos, eliminar_avisos, set_avisos, set_edit_com} =
  Comunicaciones.actions;
export default Comunicaciones.reducer;
