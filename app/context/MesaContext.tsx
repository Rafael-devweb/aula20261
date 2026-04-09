'use client'
import { createContext, ReactNode, useContext, useState } from "react";
import axios from "axios";

export class Mesa {
    constructor(
        public id: number | null,
        public numero: string,
        public status: string = "LIVRE",
        public restauranteId: number | null = null
    ) { }
}

interface MesaContextType {
    mesas: Mesa[],
    carregarMesas: (restauranteId: number) => Promise<void>,
    buscarMesaPorId: (id: number) => Promise<Mesa | null>,
    salvarMesa: (mesa: Mesa) => Promise<void>,
    atualizarMesa: (mesa: Mesa) => Promise<void>,
    alterarStatusMesa: (id: number) => Promise<void>
}

const MesaContext = createContext<MesaContextType | undefined>(undefined);

export function MesaProvider({ children }: { children: ReactNode }) {
    const [mesas, setMesas] = useState<Mesa[]>([]);

    const carregarMesas = async (restauranteId: number) => {
        const dados = await axios.get<Mesa[]>('http://localhost:8080/mesas?restauranteId=' + restauranteId);
        if(dados.status === 200){
            setMesas(dados.data);
        }
    }

    const salvarMesa = async (mesa: Mesa) => {
        const dadosResult = await axios.post<number>('http://localhost:8080/mesas', mesa);
        if(dadosResult.status === 200){
            await carregarMesas(mesa.restauranteId as number);
        }
    }

    const buscarMesaPorId = async (id: number) => {
        const dados = await axios.get<Mesa>('http://localhost:8080/mesas/' + id);
        if(dados.status === 200){
            return dados.data;
        }

        return null;
    }

    const atualizarMesa = async (mesa: Mesa) => {
        if(mesa.id == null) return;

        const dadosResult = await axios.put('http://localhost:8080/mesas/' + mesa.id, mesa);
        if(dadosResult.status === 200){
            await carregarMesas(mesa.restauranteId as number);
        }
    }

    const alterarStatusMesa = async (id: number) => {
        const dadosResult = await axios.put('http://localhost:8080/mesas/' + id + '/status');
        if(dadosResult.status === 200){
            const mesaAtualizada = dadosResult.data as Mesa;
            await carregarMesas(mesaAtualizada.restauranteId as number);
        }
    }

    return (
        <MesaContext.Provider value={{ mesas, carregarMesas, buscarMesaPorId, salvarMesa, atualizarMesa, alterarStatusMesa }}>
            {children}
        </MesaContext.Provider>
    )
}

export const useMesa = () => {
    const context = useContext(MesaContext);
    if (!context) throw new Error('useMesa deve ser usado dentro do provider!')
    return context;
}
