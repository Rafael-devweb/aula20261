'use client'
import { store } from "@/app/redux/store";
import { buscarListaClientes } from "@/app/services/clienteService";
import { atualizarVeiculo, buscarMarcas, buscarModelosPorMarca, salvarVeiculo } from "@/app/services/veiculosService";
import { Cliente } from "@/app/types/cliente";
import { Marca, Modelo, Veiculo, VeiculoFormProps } from "@/app/types/veiculos";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function VeiculoForm({ veiculoExistente }: VeiculoFormProps) {

    const [veiculo, setVeiculo] = useState<Veiculo>(
        veiculoExistente || {
            id: null,
            placa: '',
            marca: '',
            modelo: '',
            ano: '',
            clienteId: null,
            marcaId: undefined,
            modeloId: undefined
        }
    );

    useEffect(() => {
        if (veiculoExistente) {
            setVeiculo({
                ...veiculoExistente,
                marcaId: veiculoExistente.marcaId,
                modeloId: veiculoExistente.modeloId,
                clienteId: veiculoExistente.clienteId
            });
        }
    }, [veiculoExistente]);

    const router = useRouter();

    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [marcas, setMarcas] = useState<Marca[]>([]);
    const [modelos, setModelos] = useState<Modelo[]>([]);

    const carregarDados = async () => {
        const dadosCliente = await buscarListaClientes();
        setClientes(dadosCliente);
    }

    const carregarMarcas = async () => {
        try {
            const data = await buscarMarcas();
            setMarcas(data);
        } catch (error) {
            console.error("Erro ao carregar marcas", error);
        }
    };

    const carregarModelos = async (marcaId: number) => {
        try {
            const data = await buscarModelosPorMarca(marcaId);
            setModelos(data);
        } catch (error) {
            console.error("Erro ao carregar modelos", error);
        }
    };

    useEffect(() => {
        carregarDados();
        carregarMarcas();
    }, [veiculoExistente]);

    useEffect(() => {
        if (veiculo.marcaId) {
            carregarModelos(veiculo.marcaId);
        }
    }, [veiculo.marcaId]);



    const handleChange = (campo: 'placa' | 'marcaId' | 'modeloId' | 'ano' | 'clienteId', valor: string) => {
        setVeiculo(prev => {
            const novoValor = campo === 'clienteId' || campo === 'marcaId' || campo === 'modeloId'
                ? (valor ? Number(valor) : undefined)
                : valor;

            const novoVeiculo = {
                ...prev,
                [campo]: novoValor
            };

            // Se mudou a marca, limpa o modelo
            if (campo === 'marcaId') {
                novoVeiculo.modeloId = undefined;
            }

            return novoVeiculo;
        });
    }

    const handleSalvar = async (formData: FormData) => {

        const veiculoSalvar = {
            ...veiculo,
            marca: marcas.find(m => m.id === veiculo.marcaId)?.nome || '',
            modelo: modelos.find(m => m.id === veiculo.modeloId)?.nome || ''
        };

        if (veiculoSalvar.id) {
            await atualizarVeiculo(veiculoSalvar);
            alert("Veículo atualizado com sucesso!")
        } else {
            await salvarVeiculo(veiculoSalvar);
            alert("Veículo salvo com sucesso!")
        }

        router.push("/veiculos")
    }

    return (
        <form action={handleSalvar} className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Placa */}
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                        Placa de Identificação
                    </label>
                    <input
                        type="text"
                        required
                        value={veiculo.placa}
                        onChange={(e) => handleChange('placa', e.target.value)}
                        placeholder="Ex: ABC1D23"
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none text-sm font-mono tracking-wider uppercase"
                    />
                </div>

                {/* Marca */}
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                        Fabricante / Marca
                    </label>
                    <select
                        required
                        value={veiculo.marcaId || ''}
                        onChange={(e) => handleChange('marcaId', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none text-sm font-medium appearance-none cursor-pointer"
                    >
                        <option value="" className="text-zinc-600">Selecione a marca</option>
                        {marcas.map(m => (
                            <option key={m.id} value={m.id} className="bg-zinc-900 text-white">{m.nome}</option>
                        ))}
                    </select>
                </div>

                {/* Modelo */}
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                        Modelo do Veículo
                    </label>
                    <select
                        required
                        value={veiculo.modeloId || ''}
                        onChange={(e) => handleChange('modeloId', e.target.value)}
                        disabled={!veiculo.marcaId}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none text-sm font-medium appearance-none disabled:opacity-40 disabled:bg-zinc-900/50 disabled:border-zinc-850 disabled:cursor-not-allowed cursor-pointer"
                    >
                        <option value="" className="text-zinc-600">Selecione o modelo</option>
                        {modelos.map(m => (
                            <option key={m.id} value={m.id} className="bg-zinc-900 text-white">{m.nome}</option>
                        ))}
                    </select>
                </div>

                {/* Ano */}
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                        Ano de Fabricação
                    </label>
                    <input
                        type="text"
                        required
                        value={veiculo.ano}
                        onChange={(e) => handleChange('ano', e.target.value)}
                        placeholder="Ex: 2024"
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none text-sm font-mono"
                    />
                </div>

                {/* Cliente */}
                <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                        Proprietário / Cliente Responsável
                    </label>
                    <select
                        required
                        value={veiculo.clienteId || ''}
                        onChange={(e) => handleChange('clienteId', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none text-sm font-medium appearance-none cursor-pointer"
                    >
                        <option value="" className="text-zinc-600">Selecione um cliente</option>
                        {clientes.map((cliente) => (
                            <option key={cliente.id || 0} value={cliente.id || 0} className="bg-zinc-900 text-white">
                                {cliente.nome}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Ações / Rodapé */}
                <div className="md:col-span-2 flex items-center justify-end gap-6 pt-6 mt-4 border-t border-zinc-800/60">
                    <Link
                        href="/veiculos"
                        className="text-xs font-bold text-zinc-500 hover:text-zinc-300 tracking-wider transition-colors uppercase"
                    >
                        Cancelar
                    </Link>
                    <button
                        type="submit"
                        className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold tracking-wider rounded-xl shadow-lg shadow-blue-900/10 transition-all active:scale-95 uppercase cursor-pointer"
                    >
                        Salvar Alterações
                    </button>
                </div>
            </div>
        </form>
    )
}
