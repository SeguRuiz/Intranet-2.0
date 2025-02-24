import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 avisos: []
};

const Avisos = createSlice({
  name: "Avisos",
  initialState,
  reducers: {
    setAvisos: (state, action) => {
        state.avisos = action.payload
    },

    agregarAviso: (state, action) => {
        state.avisos.push(action.payload)
    },
    eliminarAviso: (state, action) => {
        const {id} = action.payload
        const avisosFiltrados = state.avisos.filter(x => x.id != id)

        state.avisos = avisosFiltrados
    }
  },
});

export const { setAvisos, agregarAviso, eliminarAviso } =
  Avisos.actions;
export default Avisos.reducer;
