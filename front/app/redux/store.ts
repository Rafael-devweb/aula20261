import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"
import osModalReducer from "./slices/osModalSlice"


export const store = configureStore({

    reducer:{
        auth: authReducer,
        osModal: osModalReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;