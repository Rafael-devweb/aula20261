'use client'
import { useAuth } from "@/app/context/AuthContext";
import { useCliente } from "@/app/context/ClienteContext";
import { Veiculo, useVeiculo } from "@/app/context/VeiculoContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

interface VeiculoFormProps {
    veiculoExistente?: Veiculo
}

export default function VeiculoForm({ veiculoExistente }: VeiculoFormProps) {
    const { usuario } = useAuth();
    const { clientes, carregarClientes } = useCliente();
    const { salvarVeiculo, atualizarVeiculo } = useVeiculo();

    const [veiculo, setVeiculo] = useState<Veiculo>(
        veiculoExistente || new Veiculo(null, '', '', '', '', null, usuario?.tipo === "OFICINA" ? usuario.id : usuario?.oficinaId)
    );

    const router = useRouter();

    useEffect(() => {
        const oficinaId = usuario?.tipo === "OFICINA" ? usuario?.id : usuario?.oficinaId;
        if(oficinaId){
            carregarClientes(oficinaId);
        }
    }, [usuario]);

    const handleChange = (campo: 'placa' | 'marca' | 'modelo' | 'ano' | 'clienteId', valor: string) => {
        setVeiculo(prev =>
            new Veiculo(
                prev.id,
                campo === 'placa' ? valor : prev.placa,
                campo === 'marca' ? valor : prev.marca,
                campo === 'modelo' ? valor : prev.modelo,
                campo === 'ano' ? valor : prev.ano,
                campo === 'clienteId' ? (valor ? Number(valor) : null) : prev.clienteId,
                prev.oficinaId
            )
        )
    }

    const handleSalvar = async (formData: FormData) => {
        const oficinaId = usuario?.tipo === "OFICINA" ? usuario.id : usuario?.oficinaId;
        if(!oficinaId){
            return;
        }
        const veiculoSalvar = new Veiculo(
            veiculo.id,
            veiculo.placa,
            veiculo.marca,
            veiculo.modelo,
            veiculo.ano,
            veiculo.clienteId,
            oficinaId || null
        );

        if(veiculoSalvar.id){
            await atualizarVeiculo(veiculoSalvar);
            alert("Veículo atualizado com sucesso!")
        }else{
            await salvarVeiculo(veiculoSalvar);
            alert("Veículo salvo com sucesso!")
        }

        router.push("/veiculos")
    }

    return (
       <form action={handleSalvar} className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-zinc-800">
                    Placa
                </label>
                <input
                    type="text"
                    required
                    value={veiculo.placa}
                    onChange={(e) => handleChange('placa', e.target.value)}
                    placeholder="ABC-1234"
                    className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-slate-400 transition-all outline-none"
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-zinc-800">
                    Marca
                </label>
                <input
                    type="text"
                    required
                    value={veiculo.marca}
                    onChange={(e) => handleChange('marca', e.target.value)}
                    placeholder="Marca do veículo"
                    className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-slate-400 transition-all outline-none"
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-zinc-800">
                    Modelo
                </label>
                <input
                    type="text"
                    required
                    value={veiculo.modelo}
                    onChange={(e) => handleChange('modelo', e.target.value)}
                    placeholder="Modelo do veículo"
                    className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-slate-400 transition-all outline-none"
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-zinc-800">
                    Ano
                </label>
                <input
                    type="text"
                    required
                    value={veiculo.ano}
                    onChange={(e) => handleChange('ano', e.target.value)}
                    placeholder="2020"
                    className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-slate-400 transition-all outline-none"
                />
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-sm font-semibold text-zinc-800">
                    Cliente
                </label>
                <select
                    required
                    value={veiculo.clienteId || ''}
                    onChange={(e) => handleChange('clienteId', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-slate-400 transition-all outline-none"
                >
                    <option value="">Selecione um cliente</option>
                    {clientes.map((cliente) => (
                        <option key={cliente.id || 0} value={cliente.id || 0}>{cliente.nome}</option>
                    ))}
                </select>
            </div>

            <div className="md:col-span-2 flex items-center justify-end gap-6 pt-6 mt-6 border-t border-zinc-200">
                <Link 
                    href="/veiculos" 
                    className="text-sm font-bold text-zinc-500 hover:text-zinc-700 transition-colors"
                >
                    CANCELAR
                </Link>
                <button 
                    type="submit" 
                    className="px-10 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl shadow-lg shadow-zinc-900/20 transition-all active:scale-95"
                >
                    SALVAR ALTERAÇÕES
                </button>
            </div>
        </div>
    </form>
)
}
