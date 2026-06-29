import api from "./api";
import { OrdemServicoRequest, OrdemServicoResponse, EnumStatusOS } from "../types/os";

export const osService = {
    listarTodos: async (): Promise<OrdemServicoResponse[]> => {
        const response = await api.get<OrdemServicoResponse[]>("/ordens-servico");
        return response.data;
    },

    buscarPorId: async (id: number): Promise<OrdemServicoResponse> => {
        const response = await api.get<OrdemServicoResponse>(`/ordens-servico/${id}`);
        return response.data;
    },

    salvar: async (request: OrdemServicoRequest): Promise<void> => {
        await api.post("/ordens-servico", request);
    },

    cancelar: async (id: number): Promise<void> => {
        await api.put(`/ordens-servico/${id}/cancelar`);
    },

    alterarStatus: async (id: number, status: string): Promise<void> => {
        await api.put(`/ordens-servico/${id}/status`, { status }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
};
