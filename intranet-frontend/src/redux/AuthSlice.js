import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  token: '', 
  userInSession: null,
  authorized: false,
  retraer: 0
};

const AuthUser = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setTokenUser: (state, action) => {
       state.token = action.payload
    },
    setUserSession: (state, action) => {
      state.userInSession = action.payload
    },
    setUserNull: (state) => {
        state.userInSession = null
    },
    setAutorized: (state, action)=>{
        state.authorized = action.payload
    },
    setRolUser: (state, action) =>{
      const {rol_id, rol_tipo} = action.payload
      state.userInSession.rol_id = rol_id
      state.userInSession.rol_tipo = rol_tipo
    },
    actualizar: (state) => {
        state.retraer += 1
    }
  },
});

export const { setTokenUser, setUserSession, setUserNull, setAutorized, setRolUser, actualizar } = AuthUser.actions;
export default AuthUser.reducer;
