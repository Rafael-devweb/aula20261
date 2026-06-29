'use client'
import { store } from "@/app/redux/store";
import { buscarListaClientes } from "@/app/services/clienteService";
import { Cliente } from "@/app/types/cliente";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Clientes() {

    const usuario = store.getState().auth.usuario
    const [clientes, setClientes] = useState<Cliente[]>([]);

    useEffect(() => {
        carregarDados();
    }, [usuario]);

    const carregarDados = async () => {
        const oficinaId = usuario?.tipo === "OFICINA" ? usuario?.id : usuario?.oficinaId;
        if (oficinaId) {

            var dadosCliente = await buscarListaClientes();


            setClientes(dadosCliente);
        }
    }
    return (
        <div className="p-6 max-w-6xl mx-auto pb-12">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">
                        Gestão de Clientes
                    </h1>
                    <p className="text-zinc-400 text-sm mt-1">
                        Administre os registros, contatos e históricos dos proprietários atendidos.
                    </p>
                </div>

                <Link
                    href="/clientes/novo"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-900/20"
                >
                    <span className="text-base font-normal">+</span> Novo Cliente
                </Link>
            </div>

            {/* Tabela Container */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl shadow-black/20 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-zinc-950/60 border-b border-zinc-800">
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-zinc-500">Código</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-zinc-400">Nome</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-zinc-400">Telefone</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-zinc-500 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/50">
                            {clientes.map((cliente) => (
                                <tr key={cliente.id || 0} className="hover:bg-zinc-850/40 transition-colors group">
                                    {/* Identificador */}
                                    <td className="px-6 py-4 text-sm font-mono text-zinc-500 group-hover:text-zinc-400 transition-colors">
                                        #{cliente.id}
                                    </td>

                                    {/* Nome */}
                                    <td className="px-6 py-4 text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">
                                        {cliente.nome}
                                    </td>

                                    {/* Telefone */}
                                    <td className="px-6 py-4 text-sm font-mono text-zinc-400">
                                        {cliente.telefone}
                                    </td>

                                    {/* Ações */}
                                    <td className="px-6 py-4 text-sm text-right">
                                        <Link
                                            href={`/clientes/${cliente.id}/editar`}
                                            className="text-blue-400 hover:text-blue-300 font-semibold text-xs transition-colors"
                                        >
                                            Editar
                                        </Link>
                                    </td>
                                </tr>
                            ))}

                            {/* Estado Vazio (Empty State) */}
                            {clientes.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-16 text-center text-zinc-500 border-2 border-dashed border-zinc-850/50 m-4 rounded-xl">
                                        <p className="text-sm font-medium">Nenhum cliente indexado no sistema!</p>
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