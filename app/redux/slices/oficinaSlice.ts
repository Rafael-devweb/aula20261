import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Oficina } from "@/app/types/oficina"

const initialState={
    oficina:"",
    token:""
}

const oficinaSlice = createSlice(

    {
        name: 'oficina',
        initialState,
        reducers:{
            login:(state, action: PayloadAction<{oficina: string, token: string}>)=> {
                state.token = action.payload.token;
                state.oficina = action.payload.oficina;
            },

            logout:(state)=>{
                state.token = ""
                state.oficina= ""

            }
        }

    });

    export const {login,logout } = oficinaSlice.actions;
    export default oficinaSlice.reducer;