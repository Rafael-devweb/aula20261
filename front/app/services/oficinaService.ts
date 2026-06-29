'use client'
import { Oficina, DashboardStats, OficinaRequest } from "@/app/types/oficina";
import api from "./api";
import { TokenResponse } from "../types/auth";

export async function buscarListaOficinas(): Promise<Oficina[]> {
    const response = await api.get<Oficina[]>('/oficina');
    return response.data;
}

export async function criarOficina(oficina: OficinaRequest): Promise<void> {
    await api.post('/oficina', oficina);
}

export async function buscarEstatisticas(): Promise<DashboardStats> {
    const response = await api.get<DashboardStats>('/oficina/stats');
    return response.data;
}

export async function vincularOficina(oficinaId: number): Promise<TokenResponse> {
    const response = await api.post<TokenResponse>(`/oficina/vincular/${oficinaId}`);
    if(response.status === 200){
        return response.data;
    }

    throw new Error("Erro ao vincular oficina")
}
