import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"
import { Oficina } from "../types/oficina";
import oficinaReducer from "./slices/academiaSlice"


export const store = configureStore({

    reducer:{
        auth: authReducer,
        oficina: oficinaReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;