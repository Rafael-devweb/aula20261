'use client'
import { useAuth, Usuario } from "@/app/context/AuthContext";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

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
            const restauranteId = usuarioLogado.tipo === "RESTAURANTE" ? usuarioLogado.id : usuarioLogado.restauranteId;
            const dados = await axios.get<Usuario[]>('http://localhost:8080/usuarios?restauranteId='+restauranteId+'&usuarioLogadoId='+usuarioLogado.id);

            if(dados.status!==200){
                alert("Erro ao carregar dados dos funcionários!");
            }

            setUsuarios(dados.data);

        } catch (error) {
            console.error(error)
        }
    }

    const handlerAlerarStatus = async (usuario: Usuario) => {
        if(usuario.tipo === "RESTAURANTE"){
            return;
        }

        try {
            const dados = await axios.put<Usuario>('http://localhost:8080/usuarios/'+usuario.id+'/status');

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
                <h1 className="text-2xl font-bold text-amber-950 tracking-tight">
                    Gestão de Funcionários
                </h1>
                <Link
                    href="/usuarios/novo"
                    className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
                >
                    <span className="text-xl">+</span> Novo Funcionário
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-amber-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-amber-50 border-b border-amber-100">
                                <th className="px-6 py-4 text-sm font-semibold text-amber-900">Código</th>
                                <th className="px-6 py-4 text-sm font-semibold text-amber-900">Nome</th>
                                <th className="px-6 py-4 text-sm font-semibold text-amber-900">E-mail</th>
                                <th className="px-6 py-4 text-sm font-semibold text-amber-900">Tipo</th>
                                <th className="px-6 py-4 text-sm font-semibold text-amber-900">Status</th>
                                <th className="px-6 py-4 text-sm font-semibold text-amber-900 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-amber-50">
                            {usuarios.map((usuario) => (
                                <tr key={usuario.id} className="hover:bg-amber-50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-mono text-amber-700">
                                        #{usuario.id}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-amber-950">
                                        {usuario.nome}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-amber-900/80">
                                        {usuario.email}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-amber-900/80">
                                        {usuario.tipo}
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
                                            className="text-amber-700 hover:text-amber-900 font-medium transition-colors"
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
                                    <td colSpan={6} className="px-6 py-12 text-center text-amber-900/60 italic">
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
