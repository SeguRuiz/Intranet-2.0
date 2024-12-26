import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: localStorage.getItem("page") || "sin definir",
  Contenidos: [],
  grupo_mostrandose: null,
  Arhivos_subcontenidos: [],
  archivo_mostrandose: null,
  profesores: [],
  estudiantes: [],
};

const CursosContenidos = createSlice({
  name: "CursosContenidos",
  initialState,
  reducers: {
    set_current_page: (state, action) => {
      state.page = action.payload;
    },
    set_grupo_mostrandose: (state, action) => {
      state.grupo_mostrandose = action.payload;
    },
    set_usuarios_del_grupo: (state, action) => {
      const { rol, data } = action.payload;
      switch (rol) {
        case "estudiantes":
          state.estudiantes = data;
          break;

        case "profesores":
          state.profesores = data;
          break;
        default:
          console.log("accion no permitida");

          break;
      }
    },
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
      const { contenido_id, data } = action.payload;
      const contenidos_copy = [...state.Contenidos];
      contenidos_copy.forEach((e) => {
        if (e.id == contenido_id) {
          e.subcontenidos.push(data);
        }
      });
      state.Contenidos = contenidos_copy;
    },
    deleteSubcontenidos: (state, action) => {
      const { subcontenidoId, contenidoId } = action.payload;
      const contenidos_copy = [...state.Contenidos];

      contenidos_copy.forEach((e) => {
        if (e.id == contenidoId) {
          const subcontenidos_copy = e.subcontenidos.filter(
            (subcontenido) => subcontenido.id != subcontenidoId
          );
          e.subcontenidos = subcontenidos_copy;
        }
      });
      console.log(subcontenidoId, contenidoId);

      state.Contenidos = contenidos_copy;
    },
    add_archivos_subcontenidos: (state, action) => {
      const { contenido_id, subcontenido_id, data, action_file } = action.payload;

      switch (action_file) {
        case "add":
          state.Contenidos.forEach((e) => {
            if (e.id == contenido_id) {
              e.subcontenidos.forEach((x) => {
                if (x.id == subcontenido_id) {
                  x.archivo = data.id;
                }
              });
            }
          });
          state.Arhivos_subcontenidos.push(data);
          break;
        case "reset":
          (() => {
            state.Arhivos_subcontenidos.forEach((e) => {
              if (e.id == data.id) {
                e.expira_en = data.expira_en
                e.archivo = data.archivo
              }
            });
          })();
          break;
        default:
          break;
      }
    },
    delete_archivos_subcontenidos: (state, action) => {
      const { contenido_id, subcontenido_id } = action.payload;

      const contenidos_copy = [...state.Contenidos];

      contenidos_copy.forEach((e) => {
        if (e.id == contenido_id) {
          e.subcontenidos.forEach((x) => {
            if (x.id == subcontenido_id) {
              x.archivo = null;
            }
          });
        }
      });

      state.Contenidos = contenidos_copy;
    },

    set_archivo_mostrandose: (state, action) => {
      state.archivo_mostrandose = action.payload;
    },
  },
});

export const {
  setContenidos,
  pushContenidos,
  deleteContenidos,
  addSubcontenido,
  deleteSubcontenidos,
  add_archivos_subcontenidos,
  delete_archivos_subcontenidos,
  set_archivo_mostrandose,
  set_usuarios_del_grupo,
  set_grupo_mostrandose,
  set_current_page,
} = CursosContenidos.actions;
export default CursosContenidos.reducer;
