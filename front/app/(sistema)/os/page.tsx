'use client'

import { useEffect, useState } from "react";
import { OrdemServicoResponse as OrdemServico } from "@/app/types/os";
import { osService } from "@/app/services/osService";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { abrirModal } from "@/app/redux/slices/osModalSlice";
import OSDetalheModal from "@/app/components/OSDetalheModal";

export default function KanbanOS() {
    const dispatch = useDispatch();
    const [ordens, setOrdens] = useState<OrdemServico[]>([]);
    const [loading, setLoading] = useState(true);



    const carregarOS = async () => {
        setLoading(true);
        const lista = await osService.listarTodos();
        setOrdens(lista);
        setLoading(false);
    };

    const handleDragStart = (e: React.DragEvent, osId: number) => {
        e.dataTransfer.setData("osId", osId.toString());
    };

    const handleDrop = async (e: React.DragEvent, novoStatus: string) => {
        const osId = Number(e.dataTransfer.getData("osId"));
        if (!osId) return;

        const os = ordens.find(o => o.id === osId);
        if (os && os.status !== novoStatus) {
            try {
                await osService.alterarStatus(osId, novoStatus);
                setOrdens(prev => prev.map(o => o.id === osId ? { ...o, status: novoStatus } : o));
            } catch (error) {
                alert("Erro ao alterar status da OS");
                console.error(error);
            }
        }
    };

    const handleCancelar = async (id: number) => {
        if (!confirm("Tem certeza que deseja cancelar esta OS?")) return;
        try {
            await osService.cancelar(id);
            setOrdens(prev => prev.map(o => o.id === id ? { ...o, status: "CANCELADO" } : o));
        } catch (error) {
            alert("Erro ao cancelar ordem de serviço")
            console.error(error);
        }
    }

    const handleEntregar = async (id: number) => {
        if (!confirm("Confirmar entrega do veículo ao cliente?")) return;
        try {
            await osService.alterarStatus(id, "RETIRADO");
            setOrdens(prev => prev.map(o => o.id === id ? { ...o, status: "RETIRADO" } : o));
        } catch (error) {
            alert("Erro ao registrar retirada");
            console.error(error);
        }
    };

    const allowDrop = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const colunas = [
        { title: "Na Fila", status: "NA_FILA", color: "bg-zinc-100 border-zinc-200" },
        { title: "Em Reparo", status: "EM_REPARO", color: "bg-blue-50 border-blue-100" },
        { title: "Finalizado", status: "FINALIZADO", color: "bg-green-50 border-green-100" }
    ];

    useEffect(() => {
        carregarOS();
    }, []);

    if (loading) return <div className="p-8">Carregando Ordens de Serviço...</div>;

    return (
        <div className="h-full flex flex-col gap-6 pb-6">
            {/* Cabeçalho do Quadro */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white">Quadro de Serviços</h1>
                    <p className="text-zinc-400 text-sm mt-1">Gerencie, arraste e atualize o status das ordens de serviço em tempo real.</p>
                </div>
                <Link
                    href="/os/nova"
                    className="px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-bold shadow-lg shadow-blue-900/20 text-sm flex items-center gap-2"
                >
                    Nova OS
                </Link>
            </div>

            {/* Container das Colunas Kanban */}
            <div className="flex gap-6 overflow-x-auto pb-4 min-h-[calc(100vh-220px)] items-start">
                {colunas.map(coluna => (
                    <div
                        key={coluna.status}
                        onDragOver={allowDrop}
                        onDrop={(e) => handleDrop(e, coluna.status)}
                        className="flex-1 min-w-[320px] max-w-[360px] bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 flex flex-col gap-4 transition-all duration-200"
                    >
                        {/* Topo da Coluna */}
                        <div className="flex items-center justify-between px-1">
                            <h2 className="font-bold text-zinc-400 uppercase tracking-wider text-xs">
                                {coluna.title}
                            </h2>
                            <span className="bg-zinc-800 px-2.5 py-0.5 rounded-full text-xs font-bold text-zinc-300 border border-zinc-700">
                                {ordens.filter(o => o.status === coluna.status).length}
                            </span>
                        </div>

                        {/* Área de Drop / Lista de Cards */}
                        <div className="flex flex-col gap-3 min-h-[500px] flex-1">
                            {ordens
                                .filter(o => o.status === coluna.status)
                                .map(os => (
                                    <div
                                        key={os.id}
                                        draggable
                                        onDragStart={(e) => {
                                            e.stopPropagation();
                                            handleDragStart(e, os.id!);
                                        }}
                                        onClick={() => dispatch(abrirModal(os))}
                                        className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-850/80 transition-all cursor-grab active:cursor-grabbing shadow-lg shadow-black/20 group"
                                    >
                                        {/* Info superior do Card */}
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-xs font-bold text-zinc-500">#{os.id}</span>
                                            <span className="text-xs font-mono font-bold text-blue-400 bg-blue-950/40 px-1.5 py-0.5 rounded border border-blue-900/30">
                                                {os.veiculo.placa}
                                            </span>
                                        </div>

                                        {/* Corpo do Card */}
                                        <h3 className="font-bold text-zinc-200 text-sm mb-1 group-hover:text-white transition-colors">
                                            {os.cliente}
                                        </h3>
                                        <p className="text-xs text-zinc-400 line-clamp-2 mb-4 leading-relaxed">
                                            {os.descricao}
                                        </p>

                                        {/* Rodapé do Card */}
                                        <div className="flex justify-between items-center pt-3 border-t border-zinc-800/80">
                                            <span className="text-xs font-medium text-zinc-500 truncate max-w-[150px]">
                                                {os.veiculo.marca} {os.veiculo.modelo}
                                            </span>

                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-bold text-green-400">
                                                    R$ {os.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                                </span>

                                                {/* Ação Condicional: Cancelar */}
                                                {os.status === "NA_FILA" && (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleCancelar(os.id!);
                                                        }}
                                                        className="text-[11px] px-2 py-1 rounded-lg bg-red-950/30 text-red-400 hover:bg-red-900/40 hover:text-red-300 font-semibold transition-colors border border-red-900/30"
                                                    >
                                                        Cancelar
                                                    </button>
                                                )}

                                                {/* Ação Condicional: Entregar */}
                                                {os.status === "FINALIZADO" && (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleEntregar(os.id!);
                                                        }}
                                                        className="text-[11px] px-2 py-1 rounded-lg bg-green-950/30 text-green-400 hover:bg-green-900/40 hover:text-green-300 font-semibold transition-colors border border-green-900/30"
                                                    >
                                                        Entregar
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            {/* Feedback visual de coluna vazia */}
                            {ordens.filter(o => o.status === coluna.status).length === 0 && (
                                <div className="flex-1 flex items-center justify-center border-2 border-dashed border-zinc-800/60 rounded-xl p-4 text-center">
                                    <span className="text-xs text-zinc-600 font-medium">Sem ordens aqui</span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <OSDetalheModal />
        </div>
    );
}
