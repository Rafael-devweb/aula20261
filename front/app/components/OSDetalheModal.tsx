'use client'
import { useDispatch, useSelector } from "react-redux";
import { X, Car, User, FileText, Package } from "lucide-react";
import { fecharModal } from "../redux/slices/osModalSlice";
import { RootState } from "../redux/store";

export default function OSDetalheModal() {
    const dispatch = useDispatch();
    const { isOpen, os } = useSelector((state: RootState) => state.osModal);

    if (!isOpen || !os) return null;

    const statusColor: Record<string, string> = {
        NA_FILA: "bg-yellow-950/40 text-yellow-400 border-yellow-900/30",
        EM_REPARO: "bg-blue-950/40 text-blue-400 border-blue-900/30",
        FINALIZADO: "bg-green-950/40 text-green-400 border-green-900/30",
        RETIRADO: "bg-zinc-800 text-zinc-300 border-zinc-700",
        CANCELADO: "bg-red-950/40 text-red-400 border-red-900/30",
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop com desfoque industrial sutil */}
            <div
                className="absolute inset-0 bg-black/75 backdrop-blur-sm"
                onClick={() => dispatch(fecharModal())}
            />

            {/* Corpo do Modal */}
            <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl shadow-black/50 w-full max-w-lg p-6 z-10 flex flex-col gap-6">

                {/* Header */}
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-white">
                            Ordem de Serviço #{os.id}
                        </h2>
                        <span className={`text-[11px] font-mono uppercase tracking-wider font-bold px-2.5 py-1 rounded-md mt-2 inline-block border ${statusColor[os.status] ?? "bg-zinc-800 text-zinc-300 border-zinc-700"}`}>
                            {os.status.replace("_", " ")}
                        </span>
                    </div>
                    <button
                        onClick={() => dispatch(fecharModal())}
                        className="text-zinc-500 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition-all cursor-pointer"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Infos Principais */}
                <div className="space-y-4 bg-zinc-950 p-4 rounded-xl border border-zinc-800/60">
                    <div className="flex items-center gap-3 text-sm text-zinc-300">
                        <User size={18} className="text-zinc-500 shrink-0" />
                        <span><span className="font-semibold text-zinc-400">Cliente:</span> {os.cliente}</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-zinc-300">
                        <Car size={18} className="text-zinc-500 shrink-0" />
                        <span>
                            <span className="font-semibold text-zinc-400">Veículo:</span> {os.veiculo.marca} {os.veiculo.modelo} — <span className="font-mono text-xs bg-zinc-900 px-1.5 py-0.5 rounded text-blue-400 border border-zinc-800">{os.veiculo.placa}</span>
                        </span>
                    </div>

                    <div className="flex items-start gap-3 text-sm text-zinc-300">
                        <FileText size={18} className="text-zinc-500 shrink-0 mt-0.5" />
                        <span className="leading-relaxed"><span className="font-semibold text-zinc-400">Descrição:</span> {os.descricao}</span>
                    </div>
                </div>

                {/* Seção de Itens e Peças */}
                {os.itens.length > 0 && (
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 px-1">
                            <Package size={16} className="text-zinc-500" />
                            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Itens e Serviços</span>
                        </div>
                        <div className="divide-y divide-zinc-800/60 border border-zinc-800 rounded-xl overflow-hidden bg-zinc-950">
                            {os.itens.map((item) => (
                                <div key={item.id} className="flex items-center justify-between px-4 py-3 text-sm hover:bg-zinc-900/40 transition-colors">
                                    <div>
                                        <p className="text-zinc-200 font-medium">{item.descricao}</p>
                                        <p className="text-zinc-500 text-xs mt-0.5">Qtd: {item.quantidade}</p>
                                    </div>
                                    <span className="text-zinc-300 font-mono font-semibold">
                                        R$ {(item.valor * item.quantidade).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Rodapé Financeiro */}
                <div className="flex items-center justify-between border-t border-zinc-800 pt-4 mt-2">
                    <span className="text-sm font-semibold text-zinc-400">Total Geral</span>
                    <span className="text-xl font-bold text-green-400 font-mono">
                        R$ {os.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                </div>
            </div>
        </div>
    );
}