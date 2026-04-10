'use client'
import { createContext, ReactNode, useContext, useState } from "react";
import axios from "axios";

export class Veiculo {
    constructor(
        public id: number | null,
        public placa: string,
        public marca: string,
        public modelo: string,
        public ano: string,
        public clienteId: number | null,
        public oficinaId: number | null = null
    ) { }
}

interface VeiculoContextType {
    veiculos: Veiculo[],
    carregarVeiculos: (oficinaId: number) => Promise<void>,
    buscarVeiculoPorId: (id: number, oficinaId: number) => Promise<Veiculo | null>,
    salvarVeiculo: (veiculo: Veiculo) => Promise<void>,
    atualizarVeiculo: (veiculo: Veiculo) => Promise<void>
}

const VeiculoContext = createContext<VeiculoContextType | undefined>(undefined);

export function VeiculoProvider({ children }: { children: ReactNode }) {
    const [veiculos, setVeiculos] = useState<Veiculo[]>([]);

    const carregarVeiculos = async (oficinaId: number) => {
        const dados = await axios.get<Veiculo[]>('http://localhost:8080/veiculos?oficinaId=' + oficinaId);
        if(dados.status === 200){
            setVeiculos(dados.data);
        }
    }

    const buscarVeiculoPorId = async (id: number, oficinaId: number) => {
        const dados = await axios.get<Veiculo>('http://localhost:8080/veiculos/' + id + '?oficinaId=' + oficinaId);
        if(dados.status === 200){
            return dados.data;
        }

        return null;
    }

    const salvarVeiculo = async (veiculo: Veiculo) => {
        const dadosResult = await axios.post<number>('http://localhost:8080/veiculos', veiculo);
        if(dadosResult.status === 200){
            await carregarVeiculos(veiculo.oficinaId as number);
        }
    }

    const atualizarVeiculo = async (veiculo: Veiculo) => {
        if(veiculo.id == null) return;
        if(veiculo.oficinaId == null) return;

        const dadosResult = await axios.put(
            'http://localhost:8080/veiculos/' + veiculo.id + '?oficinaId=' + veiculo.oficinaId,
            veiculo
        );
        if(dadosResult.status === 200){
            await carregarVeiculos(veiculo.oficinaId as number);
        }
    }

    return (
        <VeiculoContext.Provider value={{ veiculos, carregarVeiculos, buscarVeiculoPorId, salvarVeiculo, atualizarVeiculo }}>
            {children}
        </VeiculoContext.Provider>
    )
}

export const useVeiculo = () => {
    const context = useContext(VeiculoContext);
    if (!context) throw new Error('useVeiculo deve ser usado dentro do provider!')
    return context;
}
