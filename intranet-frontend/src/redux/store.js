import { configureStore } from "@reduxjs/toolkit";
import default_state from "./stateSlice";
import tokenSlice from "./tokenSlice";
import modalSlice from "./modalSlice";
import IsAdmin from "./IsAdminSlice";
import CursosContenidos from "./CursosContenidosSlice";
import ObtenerDatos from "./ObtenerDatosTareaSlice";
import ControlUsuariosSlice from "./ControlUsuariosSlice";
import AuthSlice from "./AuthSlice";
import Fetchs from "./FetchsSlice";
import Comunicaciones from "./ComunicacionesSlice"

export const store = configureStore({
  reducer: {
    default: default_state,
    Token: tokenSlice,
    modal: modalSlice,
    IsAdmin: IsAdmin,
    CursosContenidos: CursosContenidos,
    datos_tarea: ObtenerDatos,
    ControlUsuarios: ControlUsuariosSlice,
    Auth: AuthSlice,
    Fetchs: Fetchs,
    Comunicaciones: Comunicaciones
  },
});
