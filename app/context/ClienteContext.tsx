'use client'
import { createContext, ReactNode, useContext, useState } from "react";
import axios from "axios";

export class Cliente {
    constructor(
        public id: number | null,
        public nome: string,
        public telefone: string,
        public oficinaId: number | null = null
    ) { }
}

interface ClienteContextType {
    clientes: Cliente[],
    carregarClientes: (oficinaId: number) => Promise<void>,
    buscarClientePorId: (id: number, oficinaId: number) => Promise<Cliente | null>,
    salvarCliente: (cliente: Cliente) => Promise<void>,
    atualizarCliente: (cliente: Cliente) => Promise<void>
}

const ClienteContext = createContext<ClienteContextType | undefined>(undefined);

export function ClienteProvider({ children }: { children: ReactNode }) {
    const [clientes, setClientes] = useState<Cliente[]>([]);

    const carregarClientes = async (oficinaId: number) => {
        const dados = await axios.get<Cliente[]>('http://localhost:8080/clientes?oficinaId=' + oficinaId);
        if(dados.status === 200){
            setClientes(dados.data);
        }
    }

    const buscarClientePorId = async (id: number, oficinaId: number) => {
        const dados = await axios.get<Cliente>('http://localhost:8080/clientes/' + id + '?oficinaId=' + oficinaId);
        if(dados.status === 200){
            return dados.data;
        }

        return null;
    }

    const salvarCliente = async (cliente: Cliente) => {
        const dadosResult = await axios.post<number>('http://localhost:8080/clientes', cliente);
        if(dadosResult.status === 200){
            await carregarClientes(cliente.oficinaId as number);
        }
    }

    const atualizarCliente = async (cliente: Cliente) => {
        if(cliente.id == null) return;
        if(cliente.oficinaId == null) return;

        const dadosResult = await axios.put(
            'http://localhost:8080/clientes/' + cliente.id + '?oficinaId=' + cliente.oficinaId,
            cliente
        );
        if(dadosResult.status === 200){
            await carregarClientes(cliente.oficinaId as number);
        }
    }

    return (
        <ClienteContext.Provider value={{ clientes, carregarClientes, buscarClientePorId, salvarCliente, atualizarCliente }}>
            {children}
        </ClienteContext.Provider>
    )
}

export const useCliente = () => {
    const context = useContext(ClienteContext);
    if (!context) throw new Error('useCliente deve ser usado dentro do provider!')
    return context;
}
