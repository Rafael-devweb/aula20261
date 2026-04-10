'use client'
import { useAuth } from "@/app/context/AuthContext";
import { useCliente } from "@/app/context/ClienteContext";
import { useVeiculo } from "@/app/context/VeiculoContext";
import Link from "next/link";
import { useEffect } from "react";

export default function Veiculos() {

    const { usuario } = useAuth();
    const { clientes, carregarClientes } = useCliente();
    const { veiculos, carregarVeiculos } = useVeiculo();

    useEffect(() => {
        const oficinaId = usuario?.tipo === "OFICINA" ? usuario?.id : usuario?.oficinaId;
        if(oficinaId){
            carregarClientes(oficinaId);
            carregarVeiculos(oficinaId);
        }
    }, [usuario]);

    const buscarNomeCliente = (clienteId: number | null) => {
        if(clienteId == null) return "Não informado";
        return clientes.find(c => c.id === clienteId)?.nome || "Não informado";
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">
                    Gestão de Veículos
                </h1>
                <Link
                    href="/veiculos/novo"
                    className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
                >
                    <span className="text-xl">+</span> Novo Veículo
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-zinc-100 border-b border-zinc-200">
                                <th className="px-6 py-4 text-sm font-semibold text-zinc-700">Código</th>
                                <th className="px-6 py-4 text-sm font-semibold text-zinc-700">Placa</th>
                                <th className="px-6 py-4 text-sm font-semibold text-zinc-700">Marca</th>
                                <th className="px-6 py-4 text-sm font-semibold text-zinc-700">Modelo</th>
                                <th className="px-6 py-4 text-sm font-semibold text-zinc-700">Ano</th>
                                <th className="px-6 py-4 text-sm font-semibold text-zinc-700">Cliente</th>
                                <th className="px-6 py-4 text-sm font-semibold text-zinc-700 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100">
                            {veiculos.map((veiculo) => (
                                <tr key={veiculo.id || 0} className="hover:bg-zinc-50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-mono text-zinc-500">
                                        #{veiculo.id}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-zinc-900">
                                        {veiculo.placa}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-zinc-700">
                                        {veiculo.marca}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-zinc-700">
                                        {veiculo.modelo}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-zinc-700">
                                        {veiculo.ano}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-zinc-700">
                                        {buscarNomeCliente(veiculo.clienteId)}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-right">
                                        <Link
                                            href={`/veiculos/${veiculo.id}/editar`}
                                            className="text-zinc-700 hover:text-zinc-900 font-medium transition-colors"
                                        >
                                            Editar
                                        </Link>
                                    </td>
                                </tr>
                            ))}

                            {veiculos.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-zinc-500 italic">
                                        Nenhum veículo encontrado!
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