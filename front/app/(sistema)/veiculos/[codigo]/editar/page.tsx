'use client'
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import VeiculoForm from "../../componentes/VeiculoForm";
import { Veiculo } from "@/app/types/veiculos";
import { buscarVeiculoPorId } from "@/app/services/veiculosService";
import { store } from "@/app/redux/store";
export default function EditarVeiculo() {

    const params = useParams()
    const router = useRouter()
    const codigo = Number(params.codigo);
    const usuario = store.getState().auth.usuario

    const [veiculo, setVeiculo] = useState<Veiculo | null>(null);

    useEffect(() => {
        buscarDados();
    }, [usuario]);

    const buscarDados = async () => {
        const oficinaId = usuario?.tipo === "OFICINA" ? usuario?.id : usuario?.oficinaId;
        if (!oficinaId) {
            router.push("/veiculos")
            return;
        }

        const veiculoResult = await buscarVeiculoPorId(codigo, oficinaId)

        if (veiculoResult) setVeiculo(veiculoResult)
        else router.push("/veiculos")
    }

    if (!veiculo) return (<div className="p-8">Carregando dados...</div>)

    return (
        <div className="w-full min-h-screen bg-black text-zinc-100 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">

                {/* Navegação e Cabeçalho Dinâmico */}
                <div className="flex flex-col gap-4 mb-8">
                    <Link
                        href="/veiculos"
                        className="group inline-flex items-center text-xs font-bold uppercase tracking-wider text-zinc-500 hover:text-zinc-300 transition-colors w-fit"
                    >
                        <span className="mr-2 text-sm transition-transform group-hover:-translate-x-1">&larr;</span>
                        Voltar para listagem
                    </Link>

                    <div className="space-y-1 border-l-4 border-blue-600 pl-4">
                        <h1 className="text-3xl font-bold text-white tracking-tight">
                            {codigo ? (
                                <>
                                    Editar Veículo <span className="font-mono text-zinc-500 font-normal">#{codigo}</span>
                                </>
                            ) : (
                                'Cadastro de Novo Veículo'
                            )}
                        </h1>
                        <p className="text-sm text-zinc-400">
                            {codigo ? 'Modifique os dados técnicos e o vínculo de propriedade do veículo.' : 'Insira as especificações operacionais para a entrada do automóvel.'}
                        </p>
                    </div>
                </div>

                {/* Painel do Formulário */}
                <div className="bg-zinc-900 rounded-2xl shadow-2xl shadow-black/40 border border-zinc-800 p-6 md:p-10">
                    <VeiculoForm veiculoExistente={veiculo} />
                </div>

            </div>
        </div>
    );
}
