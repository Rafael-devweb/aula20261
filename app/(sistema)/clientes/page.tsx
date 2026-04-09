'use client'
import { useAuth } from "@/app/context/AuthContext";
import { useMesa } from "@/app/context/MesaContext";
import Link from "next/link";
import { useEffect } from "react";

export default function Clientes() {

    const { usuario } = useAuth();
    const { mesas, carregarMesas, alterarStatusMesa } = useMesa();

    useEffect(() => {
        const restauranteId = usuario?.tipo === "RESTAURANTE" ? usuario?.id : usuario?.restauranteId;
        if(restauranteId){
            carregarMesas(restauranteId);
        }
    }, [usuario]);

    const handlerAlerarStatus = async (id: number | null) => {
        if(id == null) return;

        try {
            await alterarStatusMesa(id);
        } catch (error) {
            alert("Erro ao alterar status da mesa!")
        }
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-amber-950 tracking-tight">
                    Gestão de Mesas
                </h1>
                <Link
                    href="/clientes/novo"
                    className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
                >
                    <span className="text-xl">+</span> Nova Mesa
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-amber-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-amber-50 border-b border-amber-100">
                                <th className="px-6 py-4 text-sm font-semibold text-amber-900">Código</th>
                                <th className="px-6 py-4 text-sm font-semibold text-amber-900">Número</th>
                                <th className="px-6 py-4 text-sm font-semibold text-amber-900">Status</th>
                                <th className="px-6 py-4 text-sm font-semibold text-amber-900 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-amber-50">
                            {mesas.map((mesa) => (
                                <tr key={mesa.id || 0} className="hover:bg-amber-50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-mono text-amber-700">
                                        #{mesa.id}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-amber-950">
                                        {mesa.numero}
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${mesa.status === 'LIVRE'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-red-100 text-red-700'
                                            }`}>
                                            {mesa.status === 'LIVRE' ? 'Livre' : 'Ocupada'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-right space-x-3">
                                        <Link
                                            href={`/clientes/${mesa.id}/editar`}
                                            className="text-amber-700 hover:text-amber-900 font-medium transition-colors"
                                        >
                                            Editar
                                        </Link>
                                        <button
                                            onClick={() => handlerAlerarStatus(mesa.id)}
                                            className={`font-medium transition-colors ${mesa.status === 'LIVRE'
                                                    ? 'text-orange-600 hover:text-orange-800'
                                                    : 'text-green-600 hover:text-green-800'
                                                }`}
                                        >
                                            {mesa.status === 'LIVRE' ? 'Ocupada' : 'Livre'}
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {mesas.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-amber-900/60 italic">
                                        Nenhuma mesa encontrada!
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
