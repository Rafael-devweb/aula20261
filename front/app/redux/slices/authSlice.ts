import { AuthState } from "@/app/types/auth";
import { Usuario, UsuarioLogado } from "@/app/types/usuarios";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"


import Cookies from "js-cookie";

const usuarioRecover = Cookies.get('usuario')
const tokenRecover = Cookies.get('token')

const initialState : AuthState = {
    usuario: usuarioRecover ? JSON.parse(usuarioRecover) : null,
    token: tokenRecover ?? ""
}

const authSlice = createSlice(

    {
        name: 'auth',
        initialState,
        reducers: {
            login: (state, action: PayloadAction<{ usuario: UsuarioLogado, token: string }>) => {
                state.token = action.payload.token;
                state.usuario = action.payload.usuario;
                Cookies.set('usuario', JSON.stringify(action.payload.usuario), { expires: 7 });
                Cookies.set('token', action.payload.token, { expires: 7, secure: true })

            },

            logout: (state) => {
                state.token = ""
                state.usuario = null
                Cookies.remove('usuario');
                Cookies.remove('token');

            },
            atualizarToken: (state, action: PayloadAction<{ token: string }>) => {
                Cookies.set('token', action.payload.token, { expires: 7, secure: true })
                state.token = action.payload.token;
            }
        }

    });

export const { login, logout, atualizarToken } = authSlice.actions;
export default authSlice.reducer;