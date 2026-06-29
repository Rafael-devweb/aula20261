'use client'

import { RootState } from "@/app/redux/store";
import { alterarStatusUsuario, buscarListaUsuarios } from "@/app/services/usuarioService";
import { Usuario } from "@/app/types/usuarios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Usuarios() {

    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    const usuarioLogado = useSelector((state: RootState) => state.auth.usuario);

    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {

        try {

            const dados = await buscarListaUsuarios();

            setUsuarios(dados);

        } catch (error) {

            console.error(error);

            alert("Erro ao carregar dados dos usuários!");

        }

    }

    const handlerAlterarStatus = async (usuario: Usuario) => {

        try {

            await alterarStatusUsuario(usuario);

            await carregarDados();

            alert("Status alterado com sucesso!");

        } catch (error) {

            console.error(error);

            alert("Erro ao alterar status do usuário!");

        }

    }

    const usuariosFiltrados = usuarios.filter(u => u.role !== "ADMINISTRADOR");

    console.log(usuarios)

    return (

        <div className="p-6 max-w-6xl mx-auto pb-12">

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">
                        Gestão de Usuários
                    </h1>
                    <p className="text-zinc-400 text-sm mt-1">
                        Controle o nível de acesso e o status operacional dos colaboradores do sistema.
                    </p>
                </div>

                <Link
                    href="/usuarios/novo"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-900/20"
                >
                    <span className="text-base font-normal">+</span>
                    Novo Usuário
                </Link>
            </div>

            {/* Tabela Container */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl shadow-black/20 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-zinc-950/60 border-b border-zinc-800">
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-zinc-500">
                                    Código
                                </th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-zinc-400">
                                    Nome
                                </th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-zinc-400">
                                    E-mail
                                </th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-zinc-400">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-zinc-500 text-right">
                                    Ações
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-zinc-800/50">
                            {usuariosFiltrados.map((usuario) => (
                                <tr
                                    key={usuario.id}
                                    className="hover:bg-zinc-850/40 transition-colors group"
                                >
                                    {/* Identificador */}
                                    <td className="px-6 py-4 text-sm font-mono text-zinc-500 group-hover:text-zinc-400 transition-colors">
                                        #{usuario.id}
                                    </td>

                                    {/* Nome */}
                                    <td className="px-6 py-4 text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">
                                        {usuario.nome}
                                    </td>

                                    {/* E-mail */}
                                    <td className="px-6 py-4 text-sm text-zinc-400 font-medium">
                                        {usuario.email}
                                    </td>

                                    {/* Badge de Status Operacional */}
                                    <td className="px-6 py-4 text-sm">
                                        <span
                                            className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider border ${usuario.status === 'ATIVO'
                                                ? 'bg-green-950/40 text-green-400 border-green-900/30'
                                                : 'bg-red-950/40 text-red-400 border-red-900/30'
                                                }`}
                                        >
                                            {usuario.status}
                                        </span>
                                    </td>

                                    {/* Ações */}

                                    {usuario.role !== "OFICINA" ? (
                                        <td className="px-6 py-4 text-sm text-right space-x-4 whitespace-nowrap">
                                            <Link
                                                href={`/usuarios/${usuario.id}/editar`}
                                                className="text-blue-400 hover:text-blue-300 font-semibold text-xs transition-colors"
                                            >
                                                Editar
                                            </Link>
                                            <button
                                                onClick={() => handlerAlterarStatus(usuario)}
                                                className={`font-semibold text-xs transition-colors cursor-pointer ${usuario.status === 'ATIVO'
                                                        ? 'text-orange-400 hover:text-orange-300'
                                                        : 'text-green-400 hover:text-green-300'
                                                    }`}
                                            >
                                                {usuario.status === 'ATIVO' ? 'Inativar' : 'Ativar'}
                                            </button>
                                        </td>
                                    ) : (
                                        <td className="px-6 py-4 text-right whitespace-nowrap">
                                            <span className="inline-flex items-center text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 bg-zinc-950/40 border border-zinc-850 px-2.5 py-1 rounded-md">
                                                Perfil Administrativo
                                            </span>
                                        </td>
                                    )}




                                </tr>
                            ))}

                            {/* Estado Vazio (Empty State) */}
                            {usuarios.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="px-6 py-16 text-center text-zinc-500 border-2 border-dashed border-zinc-850/50 m-4 rounded-xl"
                                    >
                                        <p className="text-sm font-medium">Nenhum usuário cadastrado no sistema!</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )

}