'use client'
import { Usuario } from "@/app/context/AuthContext";
import { UsuarioMock } from "@/app/mock/usuario";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Usuarios() {

    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {
        try {
            const dados = await axios.get<Usuario[]>('http://localhost:8080/usuarios');

            if(dados.status!==200){
                alert("Erro ao carregar dados!");
            }

            setUsuarios(dados.data);

        } catch (error) {
            console.error(error)
        }
    }

    const handlerAlerarStatus = async (usuario: Usuario) => {
        try {
            setUsuarios(usuariosAtuais =>
                usuariosAtuais.map(u =>
                    u.id === usuario.id
                        ? new Usuario(u.id, u.nome, u.email, u.status)
                        : u
                ));
        } catch (error) {
            alert("Erro ao alterar status do usuário!")
        }
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            {/* Header: Título e Botão de Novo Usuário */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                    Gestão de Usuários
                </h1>
                <Link
                    href="/usuarios/novo"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
                >
                    <span className="text-xl">+</span> Novo Usuário
                </Link>
            </div>

            {/* Container da Tabela com Scroll Horizontal se necessário */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Código</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Nome</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-600">CPF</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Status</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-600 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {usuarios.map((usuario) => (
                                <tr key={usuario.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-mono text-slate-500">
                                        #{usuario.id}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-slate-800">
                                        {usuario.nome}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600">
                                        {usuario.email}
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${usuario.status ==='INATIVO'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-red-100 text-red-700'
                                            }`}>
                                            {usuario.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-right space-x-3">
                                        <Link
                                            href={`/usuarios/${usuario.id}/editar`}
                                            className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                                        >
                                            Editar
                                        </Link>
                                        <button
                                            onClick={() => handlerAlerarStatus(usuario)}
                                            className={`font-medium transition-colors ${usuario.status ==='INATIVO'
                                                    ? 'text-orange-600 hover:text-orange-800'
                                                    : 'text-green-600 hover:text-green-800'
                                                }`}
                                        >
                                            {usuario.status }
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {/* Estado Vazio */}
                            {usuarios.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500 italic">
                                        Nenhum usuário encontrado!
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