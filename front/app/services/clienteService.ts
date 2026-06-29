'use client'
import { Cliente } from "../types/cliente";
import api from "./api";

export async function buscarListaClientes(): Promise<Cliente[]> {
    // Usando a concatenação de string que você prefere
    const dados = await api.get<Cliente[]>('/clientes');

    if (dados.status == 200) {
        return dados.data;
    }
    return [];
}

export async function buscarClientePorId(id: number): Promise<Cliente | null> {
    const dados = await api.get<Cliente>('/clientes/' + id );

    if (dados.status == 200) {
        return dados.data;
    }
    return null;
}

export async function salvarCliente(cliente: Cliente): Promise<void> {
    var dadosResult = await api.post('/clientes', cliente);

    if (dadosResult.status !== 200) {
        alert("Erro ao salvar cliente!");
    }
}

export async function atualizarCliente(cliente: Cliente): Promise<void> {
    if (cliente.id == null || cliente.oficinaId == null) return;

    var dadosResult = await api.put(
        '/clientes/' + cliente.id + '?oficinaId=' + cliente.oficinaId,
        cliente
    );

    if (dadosResult.status !== 200) {
        alert("Erro ao atualizar cliente!");
    }
}

export async function alterarStatusCliente(cliente: any): Promise<void> {
    var novoStatus = "";
    if (cliente.status === "ATIVO") {
        novoStatus = "INATIVO";
    } else {
        novoStatus = "ATIVO";
    }

    var dadosResult = await api.put(
        '/clientes/' + cliente.id + '/AlterarStatus?oficinaId=' + cliente.oficinaId, 
        { status: novoStatus }
    );

    if (dadosResult.status !== 200) {
        alert("Erro ao atualizar Status!");
    }
}