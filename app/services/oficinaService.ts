import { Oficina } from "@/app/types/oficina";
import api from "./api";

export async function buscarListaOficinas(): Promise<Oficina[]> {
    const dados = await api.get<Oficina[]>('/oficina');

    if (dados.status == 200) {
        return dados.data;
    }
    return [];
}

export async function alterarStatusOficina(oficina: Oficina): Promise<void> {

    var novoStatus = {};
    if (oficina.status === "ATIVO") {
        novoStatus = { status: "INATIVO" };
    } else {
        novoStatus = { status: "ATIVO" };
    }

    var dadosResult = await api
        .put<number>('/oficina/' + oficina.id + '/AlterarStatus', { status: novoStatus });

    if (dadosResult.status !== 200) {
        alert("Erro ao atualizar Status!");
    }
}