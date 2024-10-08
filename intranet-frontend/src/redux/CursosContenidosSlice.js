import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  Contenidos: [],
  Arhivos_subcontenidos: [],
  archivo_mostrandose: null
};

const CursosContenidos = createSlice({
  name: "CursosContenidos",
  initialState,
  reducers: {
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

      state.Contenidos = contenidos_copy;
    },
    add_archivos_subcontenidos: (state, action) => {
      const { contenido_id, subcontenido_id, data } = action.payload;

      state.Contenidos.forEach((e) => {
        if (e.id == contenido_id) {
          e.subcontenidos.forEach((x) => {
            if (x.id == subcontenido_id) {
              x.archivo = data.id  
            }
          });
        }
      });
      state.Arhivos_subcontenidos.push(data);
    },
    delete_archivos_subcontenidos: (state, action) =>{
      const { contenido_id, subcontenido_id, key} = action.payload;

      const contenidos_copy = [...state.Contenidos]

      contenidos_copy.forEach((e) => {
        if (e.id == contenido_id) {
          e.subcontenidos.forEach((x) => {
            if (x.id == subcontenido_id) {
              x.archivo = null
            }
          });
        }
      });
       
      state.Contenidos = contenidos_copy
      
      // const archivos_copy = [...state.Arhivos_subcontenidos]

      // const archivos_filtered = archivos_copy.filter(x => x.key != key)

      // state.Arhivos_subcontenidos = archivos_filtered

    },

    set_archivo_mostrandose: (state, action) => {
      state.archivo_mostrandose = action.payload
    }

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
  set_archivo_mostrandose
} = CursosContenidos.actions;
export default CursosContenidos.reducer;
