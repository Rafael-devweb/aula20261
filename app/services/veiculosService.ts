'use client'
import api from "./api";
import { Veiculo } from "@/app/types/veiculos"; // Certifique-se de que a classe/type está exportada em um arquivo de types


export async function buscarListaVeiculos(): Promise<Veiculo[]> {
    const dados = await api.get<Veiculo[]>('/veiculos');

    if (dados.status === 200) {
        return dados.data;
    }
    return [];
}

export async function buscarVeiculoPorId(id: number, oficinaId: number): Promise<Veiculo | null> {
    try {
        const dados = await api.get<Veiculo>(`/veiculos/${id}?oficinaId=${oficinaId}`);
        
        if (dados.status === 200) {
            return dados.data;
        }
        return null;
    } catch (error) {
        console.error("Erro ao buscar veículo:", error);
        return null;
    }
}

export async function salvarVeiculo(veiculo: Veiculo): Promise<boolean> {
    const dadosResult = await api.post<number>('/veiculos', veiculo);

    if (dadosResult.status === 200) {
        return true;
    } else {
        alert("Erro ao salvar o veículo!");
        return false;
    }
}

export async function atualizarVeiculo(veiculo: Veiculo): Promise<boolean> {
    if (veiculo.id == null || veiculo.oficinaId == null) {
        console.error("ID ou OficinaID ausentes");
        return false;
    }

    const dadosResult = await api.put(
        `/veiculos/${veiculo.id}?oficinaId=${veiculo.oficinaId}`,
        veiculo
    );

    if (dadosResult.status === 200) {
        return true;
    } else {
        alert("Erro ao atualizar o veículo!");
        return false;
    }
}