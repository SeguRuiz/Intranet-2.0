import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  token: '', 
  userInSession: null,
  authorized: true
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
    }
  },
});

export const { setTokenUser, setUserSession, setUserNull, setAutorized } = AuthUser.actions;
export default AuthUser.reducer;
