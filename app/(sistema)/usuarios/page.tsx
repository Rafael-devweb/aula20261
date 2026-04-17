'use client'

import { useAuth } from "@/app/context/AuthContext";
import { Usuario } from "@/app/types/usuarios";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { buscarListaUsuarios } from "../services/usuarioService";

export default function Usuarios() {

    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const { usuario: usuarioLogado } = useAuth();

    useEffect(() => {
        if(usuarioLogado){
            carregarDados();
        }
    }, [usuarioLogado]);

    const carregarDados = async () => {
        if(!usuarioLogado) return;

        try {
            const dados = await buscarListaUsuarios();
           setUsuarios(dados);
        

        } catch (error) {
            alert("Erro ao carregar dados do usuario")
            console.error(error)
        }
    }

    const handlerAlerarStatus = async (usuario: Usuario) => {
        if(usuario.tipo === "OFICINA"){
            return;
        }

        try {
            const oficinaId = usuarioLogado?.tipo === "OFICINA" ? usuarioLogado?.id : usuarioLogado?.oficinaId;
            if(!oficinaId){
                return;
            }

            const dados = await axios.put<Usuario>('http://localhost:8080/usuarios/'+usuario.id+'/status?oficinaId='+oficinaId);

            if(dados.status !== 200){
                alert("Erro ao alterar status do funcionário!")
                return;
            }

            setUsuarios(usuariosAtuais =>
                usuariosAtuais.map(u =>
                    u.id === usuario.id
                        ? dados.data
                        : u
                ));
        } catch (error) {
            alert("Erro ao alterar status do funcionário!")
        }
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">
                    Gestão de Funcionários
                </h1>
                <Link
                    href="/usuarios/novo"
                    className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
                >
                    <span className="text-xl">+</span> Novo Funcionário
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-zinc-100 border-b border-zinc-200">
                                <th className="px-6 py-4 text-sm font-semibold text-zinc-700">Código</th>
                                <th className="px-6 py-4 text-sm font-semibold text-zinc-700">Nome</th>
                                <th className="px-6 py-4 text-sm font-semibold text-zinc-700">E-mail</th>
                                <th className="px-6 py-4 text-sm font-semibold text-zinc-700">Tipo</th>
                                <th className="px-6 py-4 text-sm font-semibold text-zinc-700">Status</th>
                                <th className="px-6 py-4 text-sm font-semibold text-zinc-700 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100">
                            {usuarios.map((usuario) => (
                                <tr key={usuario.id} className="hover:bg-zinc-50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-mono text-zinc-500">
                                        #{usuario.id}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-zinc-900">
                                        {usuario.nome}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-zinc-700">
                                        {usuario.email}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-zinc-700">
                                        {usuario.tipo === "OFICINA" ? "Oficina" : "Funcionário"}
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${usuario.status ==='ATIVO'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-red-100 text-red-700'
                                            }`}>
                                            {usuario.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-right space-x-3">
                                        <Link
                                            href={`/usuarios/${usuario.id}/editar`}
                                            className="text-zinc-700 hover:text-zinc-900 font-medium transition-colors"
                                        >
                                            Editar
                                        </Link>
                                        {usuario.tipo === "FUNCIONARIO" && (
                                            <button
                                                onClick={() => handlerAlerarStatus(usuario)}
                                                className={`font-medium transition-colors ${usuario.status ==='ATIVO'
                                                        ? 'text-orange-600 hover:text-orange-800'
                                                        : 'text-green-600 hover:text-green-800'
                                                    }`}
                                            >
                                                {usuario.status === 'ATIVO' ? 'Inativar' : 'Ativar'}
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}

                            {usuarios.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-zinc-500 italic">
                                        Nenhum funcionário encontrado!
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
