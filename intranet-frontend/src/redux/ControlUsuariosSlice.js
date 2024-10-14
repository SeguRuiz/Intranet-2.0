import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  aside_abierto: true,
  pestaña_seleccionada: "usuarios",
  grupo_seleccionado: null,
  mostrando_usuarios_grupo: null,
  grupos: [],
  sedes: [],
  usuarios: [],
  roles: [],
  seleccion_multiple_activado: false,
  seleccion_multiple_activado_sedes: false,
  seleccion_multiple: [],
  seleccion_multiple_sedes: [],
};

const ControlUsuarios = createSlice({
  name: "ControlUsuarios",
  initialState,
  reducers: {
    abrir_aside: (state) => {
      state.aside_abierto = true;
    },
    cerrar_aside: (state) => {
      state.aside_abierto = false;
    },
    agregar_usuarios: (state, action) => {
      state.usuarios.push(action.payload);
    },
    agregar_grupos: (state, action) => {
      state.grupos.push(action.payload);
    },
    set_grupos: (state, action) => {
      state.grupos = action.payload;
    },
    eliminar_grupos: (state, action) => {
      const { grupo_id } = action.payload;

      const usuarios_filtered = state.grupos.filter((e) => e.id != grupo_id);

      state.grupos = usuarios_filtered;
    },
    set_usuarios: (state, action) => {
      state.usuarios = action.payload;
    },
    set_roles: (state, action) => {
      state.roles = action.payload;
    },
    set_user_rol: (state, action) => {
      const { rol_id, usuario_id } = action.payload;
      state.usuarios.forEach((e) => {
        if (usuario_id == e.id) {
          e.rol_id = rol_id;
        }
      });
    },
    set_pestaña_seleccionada: (state, action) => {
      state.pestaña_seleccionada = action.payload;
    },
    add_sedes: (state, action) => {
      state.sedes.push(action.payload);
    },
    set_sedes: (state, action) => {
      state.sedes = action.payload;
    },
    agregar_a_seleccion_multiple: (state, action) => {
      state.seleccion_multiple.push({ ...action.payload });
    },
    activar_seleccion_multiple: (state) => {
      state.seleccion_multiple_activado = true;
    },
    desactivar_seleccion_multiple: (state) => {
      state.seleccion_multiple_activado = false;
      state.seleccion_multiple = [];
    },
    eliminar_de_seleccion_multiple: (state, action) => {
      const { user_id } = action.payload;

      const seleccion_filtrada = state.seleccion_multiple.filter(
        (e) => e.user_id != user_id
      );

      state.seleccion_multiple = seleccion_filtrada;
    },
    eliminar_usuarios: (state, action) => {
      const { user_id } = action.payload;

      const usuarios_filtered = state.usuarios.filter((e) => e.id != user_id);

      state.usuarios = usuarios_filtered;
    },
    eliminar_de_seleccion_multiple_sedes: (state, action) => {
      const { sede_id } = action.payload;

      const seleccion_filtrada = state.seleccion_multiple_sedes.filter(
        (e) => e.sede_id != sede_id
      );

      state.seleccion_multiple_sedes = seleccion_filtrada;
    },
    agregar_a_seleccion_multiple_sedes: (state, action) => {
      state.seleccion_multiple_sedes.push({ ...action.payload });
    },
    desactivar_seleccion_multiple_sedes: (state) => {
      state.seleccion_multiple_activado_sedes = false;
      state.seleccion_multiple_sedes = [];
    },
    activar_seleccion_multiple_sedes: (state) => {
      state.seleccion_multiple_activado_sedes = true;
    },
    vaciar_ids_temporales: (state, action) => {
      switch (action.payload) {
        case "sedes":
          state.seleccion_multiple_sedes = [];
          break;
        case "usuarios":
          state.seleccion_multiple = [];
          break;
        default:
          console.log("el valor no esta disponible");
          break;
      }
    },
    setear_grupo_mostrandose: (state, action) => {
      state.mostrando_usuarios_grupo = action.payload
    },
    set_grupo_seleccionado: (state, action) => {
        state.grupo_seleccionado = action.payload
    }
  },
});

export const {
  abrir_aside,
  cerrar_aside,
  agregar_usuarios,
  set_usuarios,
  set_roles,
  set_user_rol,
  set_pestaña_seleccionada,
  add_sedes,
  set_sedes,
  agregar_a_seleccion_multiple,
  desactivar_seleccion_multiple,
  activar_seleccion_multiple,
  eliminar_de_seleccion_multiple,
  eliminar_usuarios,
  eliminar_de_seleccion_multiple_sedes,
  agregar_a_seleccion_multiple_sedes,
  activar_seleccion_multiple_sedes,
  desactivar_seleccion_multiple_sedes,
  vaciar_ids_temporales,
  eliminar_grupos,
  agregar_grupos,
  set_grupos,
  setear_grupo_mostrandose,
  set_grupo_seleccionado
} = ControlUsuarios.actions;
export default ControlUsuarios.reducer;
