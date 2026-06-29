'use client'
import { Usuario } from "@/app/types/usuarios";
import api from "./api";


export async function buscarListaUsuarios(): Promise<Usuario[]> {
    const dados = await api.get<Usuario[]>('/usuarios');

    if (dados.status == 200) {
        return dados.data;
    }
    return [];
}

export async function alterarStatusUsuario(usuario: Usuario): Promise<void> {

    var novoStatus = usuario.status === "ATIVO" ? "INATIVO" : "ATIVO";

    var dadosResult = await api
        .put<number>('/usuarios/' + usuario.id + '/AlterarStatus', { status: novoStatus });

    if (dadosResult.status !== 200) {
        alert("Erro ao atualizar Status!")
    }
}

export async function buscarUsuarioPorId(id: string, oficinaId: number): Promise<Usuario | null> {
    const dados = await api.get<Usuario>('/usuarios/' + id + '?oficinaId=' + oficinaId);
    if (dados.status === 200) {
        return dados.data;
    }
    return null;
}

export async function salvarUsuario(usuario: Usuario): Promise<number | null> {
    const dados = await api.post<number>('/usuarios', usuario);
    if (dados.status === 200) {
        return dados.data;
    }
    return null;
}

export async function atualizarUsuario(id: number, usuario: Usuario, oficinaId: number): Promise<boolean> {
    const dados = await api.put('/usuarios/' + id + '?oficinaId=' + oficinaId, usuario);
    return dados.status === 200;
}
