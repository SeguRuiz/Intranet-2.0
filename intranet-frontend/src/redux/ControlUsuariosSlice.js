import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  aside_abierto: false,
  empty: false,
  pestaña_seleccionada: "usuarios",
  curso_seleccionado: null,
  seleccionando_integrantes: false,
  grupo_seleccionado: null,
  mostrando_usuarios_grupo: null,
  usuario_a_reportar: null,
  escojiendo_usuario: false,
  editando_reporte: {
    editando: false,
    reporte: null,
  },
  grupos: [],
  estudiantes: [],
  sedes: [],
  usuarios: [],
  roles: [],
  reportes: [],
  usuarios_en_grupos: [],
  grupos_cursos: [],
  integrantes_de_grupo: [],
  seleccion_multiple_activado: false,
  seleccion_multiple_activado_sedes: false,
  seleccion_multiple_activado_grupos: false,
  seleccion_multiple_activado_integrantes: false,
  seleccion_multiple: [],
  seleccion_multiple_sedes: [],
  seleccion_multiple_grupos: [],
  seleccion_multiple_integrantes: [],
};

const ControlUsuarios = createSlice({
  name: "ControlUsuarios",
  initialState,
  reducers: {
    set_integrantes_de_grupo: (state, action) => {
      const { usuarios, grupo_id } = action.payload;
      const grupo_existente =
        state.integrantes_de_grupo.find((x) => x.grupo_id == grupo_id) ?? false;

      if (!grupo_existente) {
        state.integrantes_de_grupo.push({
          grupo_id: grupo_id,
          usuarios: usuarios,
        });
      } else {
        state.integrantes_de_grupo.forEach((x) => {
          if (x.grupo_id == grupo_id) {
            x.usuarios = usuarios;
          }
        });
      }
    },
    set_empty: (state, action) => {
      state.empty = action.payload;
    },
    set_reporte: (state, action) => {
      const { reporte_id, estado } = action.payload;

      state.reportes.forEach((x) => {
        if (x.id == reporte_id) {
          x.estado = estado;
        }
      });
    },
    set_editando_reporte: (state, action) => {
      const { editando, reporte_id, sede, grupo, estudiante } = action.payload;

      const reporte = state.reportes.find((x) => x.id == reporte_id) ?? null;
      state.editando_reporte.reporte = reporte;
      if (reporte != null) {
        state.editando_reporte.reporte.grupo = grupo;
        state.editando_reporte.reporte.estudiante = estudiante;
        state.editando_reporte.reporte.sede = sede;
      }
      state.editando_reporte.editando = editando;
    },
    agregar_archivo_reportes: (state, action) => {
      const { reporte_id, archivo_id } = action.payload;

      const copy = [...state.reportes];
      copy.forEach((e) => {
        if (e.id == reporte_id) {
          e.presento_comprobante = true;
          e.archivo_id = archivo_id;
        }
      });
      state.reportes = copy;
    },
    set_reportes: (state, action) => {
      state.reportes = action.payload;
    },
    agregar_reportes: (state, action) => {
      state.reportes.push(action.payload);
    },
    set_estudiantes: (state, action) => {
      state.estudiantes = action.payload;
    },
    set_escojiendo_usuario: (state, action) => {
      state.escojiendo_usuario = action.payload;
    },
    set_usuario_a_reportar: (state, action) => {
      state.usuario_a_reportar = action.payload;
    },
    agregar_usuarios_en_grupo: (state, action) => {
      const { grupo_id, usuarios } = action.payload;
      usuarios.forEach((e) => {
        state.usuarios_en_grupos.push({ grupo_id: grupo_id, usuario_id: e });
      });
    },
    eliminar_usuarios_en_grupo: (state, action) => {
      const { usuario_id } = action.payload;
      const usuarios_grupos_filtered = state.usuarios_en_grupos.filter(
        (x) => x.usuario_id != usuario_id
      );
      state.usuarios_en_grupos = usuarios_grupos_filtered;
    },
    set_usuarios_en_grupos: (state, action) => {
      state.usuarios_en_grupos = action.payload;
    },
    eliminar_grupos_cursos: (state, action) => {
      const { id } = action.payload;

      const grupos_cursos_filtered = state.grupos_cursos.filter(
        (e) => e.id != id
      );

      state.grupos_cursos = grupos_cursos_filtered;
    },
    agregar_grupos_cursos: (state, action) => {
      state.grupos_cursos.push(action.payload);
      const nueva_array = Array.from(new Set(state.grupos_cursos));
      state.grupos_cursos = nueva_array;
    },
    set_grupos_cursos: (state, action) => {
      state.grupos_cursos = action.payload;
    },
    set_curso: (state, action) => {
      state.curso_seleccionado = action.payload;
    },
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
    eliminar_integrantes: (state, action) => {
      const { grupo_id, integrante_id } = action.payload;

      state.grupos.forEach((e) => {
        if (e.id == grupo_id) {
          const integrantes_filtrados = e.integrantes.filter(
            (e) => e != integrante_id
          );
          e.integrantes = integrantes_filtrados;
        }
      });

      state.integrantes_de_grupo.forEach((x) => {
        if (x.grupo_id == grupo_id) {
          const usuarios_filtrados = x.usuarios.filter(
            (x) => x.id != integrante_id
          );
          x.usuarios = usuarios_filtrados;
        }
      });
    },
    eliminar_usuarios_en_grupo_por_grupo: (state, action) => {
      const { grupo_id } = action.payload;

      const usuarios_filtrados = state.usuarios_en_grupos.filter(
        (x) => x.grupo_id != grupo_id
      );

      state.usuarios_en_grupos = usuarios_filtrados;
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
      state.seleccion_multiple.push(action.payload);
    },
    activar_seleccion_multiple: (state) => {
      state.seleccion_multiple_activado = true;
    },
    desactivar_seleccion_multiple: (state) => {
      state.seleccion_multiple_activado = false;
      state.seleccion_multiple = [];
    },
    eliminar_de_seleccion_multiple: (state, action) => {
      const seleccion_filtrada = state.seleccion_multiple.filter(
        (e) => e != action.payload
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
        case "grupos":
          state.seleccion_multiple_grupos = [];
          break;
        default:
          console.log("el valor no esta disponible");
          break;
      }
    },
    setear_grupo_mostrandose: (state, action) => {
      state.mostrando_usuarios_grupo = action.payload;
    },
    set_grupo_seleccionado: (state, action) => {
      state.grupo_seleccionado = action.payload;
    },
    set_seleccion_integrantes: (state, action) => {
      state.seleccionando_integrantes = action.payload;
    },
    agregar_integrantes_de_grupo: (state, action) => {
      const { grupo_id, usuarios } = action.payload;

      state.grupos.forEach((e) => {
        if (e.id == grupo_id) {
          const nueva_array = Array.from(
            new Set(e.integrantes.concat(usuarios))
          );
          e.integrantes = nueva_array;
        }
      });
    },
    agregar_seleccion_grupos: (state, action) => {
      state.seleccion_multiple_grupos.push(action.payload);
    },
    eliminar_de_seleccion_multiple_grupos: (state, action) => {
      const seleccion_filtrada = state.seleccion_multiple_grupos.filter(
        (e) => e != action.payload
      );

      state.seleccion_multiple_grupos = seleccion_filtrada;
    },
    setear_seleccion_grupos: (state, action) => {
      switch (action.payload) {
        case true:
          state.seleccion_multiple_activado_grupos = true;
          break;
        case false:
          state.seleccion_multiple_activado_grupos = false;
          state.seleccion_multiple_grupos = [];
          break;
        default:
          break;
      }
    },
    setear_seleccion_integrantes: (state, action) => {
      switch (action.payload) {
        case true:
          state.seleccion_multiple_activado_integrantes = true;
          break;
        case false:
          state.seleccion_multiple_activado_integrantes = false;
          state.seleccion_multiple_integrantes = [];
          break;
        default:
          break;
      }
    },
    eliminar_seleccion_integrantes: (state, action) => {
      const seleccion_filtrada = state.seleccion_multiple_integrantes.filter(
        (e) => e != action.payload
      );

      state.seleccion_multiple_integrantes = seleccion_filtrada;
    },
    agregar_seleccion_integrantes: (state, action) => {
      state.seleccion_multiple_integrantes.push(action.payload);
    },
    eliminar_reporte: (state, action) => {
      const { id } = action.payload;
      const reportes_filtrados = state.reportes.filter((x) => x.id != id);
      state.reportes = reportes_filtrados;
    },
    edit_justificacion_reporte: (state, action) => {
      const { id, reporteEditado } = action.payload;
      state.reportes[state.reportes.findIndex((x) => x.id == id)] =
        reporteEditado;
    },
  },
});

export const {
  edit_justificacion_reporte,
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
  set_grupo_seleccionado,
  set_seleccion_integrantes,
  agregar_integrantes_de_grupo,
  agregar_seleccion_grupos,
  eliminar_de_seleccion_multiple_grupos,
  setear_seleccion_grupos,
  setear_seleccion_integrantes,
  agregar_seleccion_integrantes,
  eliminar_seleccion_integrantes,
  eliminar_integrantes,
  set_curso,
  set_grupos_cursos,
  agregar_grupos_cursos,
  eliminar_grupos_cursos,
  agregar_usuarios_en_grupo,
  set_usuarios_en_grupos,
  eliminar_usuarios_en_grupo,
  eliminar_usuarios_en_grupo_por_grupo,
  set_usuario_a_reportar,
  set_escojiendo_usuario,
  set_estudiantes,
  set_reportes,
  agregar_reportes,
  agregar_archivo_reportes,
  set_editando_reporte,
  set_reporte,
  set_empty,
  set_integrantes_de_grupo,
  eliminar_reporte,
} = ControlUsuarios.actions;
export default ControlUsuarios.reducer;
