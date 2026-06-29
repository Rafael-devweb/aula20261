'use client'

import { store } from "@/app/redux/store";
import { buscarListaClientes } from "@/app/services/clienteService";
import { buscarListaVeiculos } from "@/app/services/veiculosService";
import { Cliente } from "@/app/types/cliente";
import { Veiculo } from "@/app/types/veiculos";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Veiculos() {
    const [veiculos, setVeiculo] = useState<Veiculo[]>([]);
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const usuario = store.getState().auth.usuario;

    useEffect(() => {
        carregarDados();
    }, [usuario]);

    const carregarDados = async () => {
        const oficinaId = usuario?.tipo === "OFICINA" ? usuario?.id : usuario?.oficinaId;
        if (oficinaId) {

            var dadosCliente = await buscarListaClientes();

            var dadosVeiculo = await buscarListaVeiculos();

            setVeiculo(dadosVeiculo);
            setClientes(dadosCliente);
        }
    }
    const buscarNomeCliente = (clienteId: number | null) => {
        if (clienteId == null) return "Não informado";
        return clientes.find(c => c.id === clienteId)?.nome || "Não informado";
    }

    return (
        <div className="p-6 max-w-6xl mx-auto pb-12">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">
                        Gestão de Veículos
                    </h1>
                    <p className="text-zinc-400 text-sm mt-1">
                        Cadastre a frota e associe os automóveis aos seus respectivos clientes.
                    </p>
                </div>

                <Link
                    href="/veiculos/novo"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-900/20"
                >
                    <span className="text-base font-normal">+</span> Novo Veículo
                </Link>
            </div>

            {/* Tabela Container */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl shadow-black/20 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-zinc-950/60 border-b border-zinc-800">
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-zinc-500">Código</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-zinc-400">Placa</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-zinc-400">Marca</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-zinc-400">Modelo</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-zinc-500">Ano</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-zinc-400">Cliente</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-zinc-500 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/50">
                            {veiculos.map((veiculo) => (
                                <tr key={veiculo.id || 0} className="hover:bg-zinc-850/40 transition-colors group">
                                    {/* Identificador */}
                                    <td className="px-6 py-4 text-sm font-mono text-zinc-500 group-hover:text-zinc-400 transition-colors">
                                        #{veiculo.id}
                                    </td>

                                    {/* Placa com Tag Operacional */}
                                    <td className="px-6 py-4 text-sm">
                                        <span className="text-xs font-mono font-bold text-blue-400 bg-blue-950/40 px-2 py-1 rounded border border-blue-900/30 tracking-wider">
                                            {veiculo.placa}
                                        </span>
                                    </td>

                                    {/* Marca */}
                                    <td className="px-6 py-4 text-sm font-medium text-zinc-300">
                                        {veiculo.marca}
                                    </td>

                                    {/* Modelo */}
                                    <td className="px-6 py-4 text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">
                                        {veiculo.modelo}
                                    </td>

                                    {/* Ano */}
                                    <td className="px-6 py-4 text-sm font-mono text-zinc-400">
                                        {veiculo.ano}
                                    </td>

                                    {/* Cliente */}
                                    <td className="px-6 py-4 text-sm text-zinc-400 font-medium">
                                        {buscarNomeCliente(veiculo.clienteId)}
                                    </td>

                                    {/* Ações */}
                                    <td className="px-6 py-4 text-sm text-right">
                                        <Link
                                            href={`/veiculos/${veiculo.id}/editar`}
                                            className="text-blue-400 hover:text-blue-300 font-semibold text-xs transition-colors"
                                        >
                                            Editar
                                        </Link>
                                    </td>
                                </tr>
                            ))}

                            {/* Estado Vazio (Empty State) */}
                            {veiculos.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="px-6 py-16 text-center text-zinc-500 border-2 border-dashed border-zinc-850/50 m-4 rounded-xl">
                                        <p className="text-sm font-medium">Nenhum veículo encontrado no pátio!</p>
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