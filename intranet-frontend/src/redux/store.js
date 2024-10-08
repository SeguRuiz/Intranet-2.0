import { configureStore } from "@reduxjs/toolkit";
import default_state from "./stateSlice";
import tokenSlice from "./tokenSlice";
import modalSlice from "./modalSlice";
import IsAdmin from "./IsAdminSlice";
import CursosContenidos from "./CursosContenidosSlice";
export const store = configureStore({
  reducer: {
    default: default_state,
    Token: tokenSlice,
    modal: modalSlice,
    IsAdmin: IsAdmin,
    CursosContenidos: CursosContenidos,
  },
});
