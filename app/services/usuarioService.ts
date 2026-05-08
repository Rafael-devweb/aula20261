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

    var novoStatus = {};
    if (usuario.status === "ATIVO") {
        novoStatus = { status: "INATIVO" };
    } else {
        novoStatus = { status: "ATIVO" };
    }

    var dadosResult = await api
        .put<number>('/usuarios/' + usuario.id + '/AlterarStatus', { status: novoStatus });

    if (dadosResult.status !== 200) {
        alert("Erro ao atualizar Status!")
    }
}
