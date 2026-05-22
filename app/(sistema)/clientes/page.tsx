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

    const carregarDados = async () =>{
        const oficinaId = usuario?.tipo === "OFICINA" ? usuario?.id : usuario?.oficinaId;
        if(oficinaId){

            var dadosCliente = await  buscarListaClientes();


            setClientes(dadosCliente);
        }
    }
    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">
                    Gestão de Clientes
                </h1>
                <Link
                    href="/clientes/novo"
                    className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
                >
                    <span className="text-xl">+</span> Novo Cliente
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-zinc-100 border-b border-zinc-200">
                                <th className="px-6 py-4 text-sm font-semibold text-zinc-700">Código</th>
                                <th className="px-6 py-4 text-sm font-semibold text-zinc-700">Nome</th>
                                <th className="px-6 py-4 text-sm font-semibold text-zinc-700">Telefone</th>
                                <th className="px-6 py-4 text-sm font-semibold text-zinc-700 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100">
                            {clientes.map((cliente) => (
                                <tr key={cliente.id || 0} className="hover:bg-zinc-50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-mono text-zinc-500">
                                        #{cliente.id}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-zinc-900">
                                        {cliente.nome}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-zinc-700">
                                        {cliente.telefone}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-right">
                                        <Link
                                            href={`/clientes/${cliente.id}/editar`}
                                            className="text-zinc-700 hover:text-zinc-900 font-medium transition-colors"
                                        >
                                            Editar
                                        </Link>
                                    </td>
                                </tr>
                            ))}

                            {clientes.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-zinc-500 italic">
                                        Nenhum cliente encontrado!
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