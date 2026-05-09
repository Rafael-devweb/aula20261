import { createSlice, PayloadAction } from "@reduxjs/toolkit"


const initialState={
    usuario:"",
    token:""
}

const oficinaSlice = createSlice(

    {
        name: 'oficina',
        initialState,
        reducers:{
            login:(state, action: PayloadAction<{usuario: string, token: string}>)=> {
                state.token = action.payload.token;
                state.usuario = action.payload.usuario;
            },

            logout:(state)=>{
                state.token = ""
                state.usuario= ""

            }
        }

    });

    export const {login,logout } = oficinaSlice.actions;
    export default oficinaSlice.reducer;