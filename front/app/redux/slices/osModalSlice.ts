import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrdemServicoResponse } from "@/app/types/os";

interface OSModalState {
    isOpen: boolean;
    os: OrdemServicoResponse | null;
}

const initialState: OSModalState = {
    isOpen: false,
    os: null,
};

const osModalSlice = createSlice({
    name: "osModal",
    initialState,
    reducers: {
        abrirModal: (state, action: PayloadAction<OrdemServicoResponse>) => {
            state.isOpen = true;
            state.os = action.payload;
        },
        fecharModal: (state) => {
            state.isOpen = false;
            state.os = null;
        },
    },
});

export const { abrirModal, fecharModal } = osModalSlice.actions;
export default osModalSlice.reducer;