'use client'
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import VeiculoForm from "../../componentes/VeiculoForm";
import { Veiculo, useVeiculo } from "@/app/context/VeiculoContext";
import { useAuth } from "@/app/context/AuthContext";

export default function EditarVeiculo(){

    const params = useParams()
    const router = useRouter()
    const codigo = Number(params.codigo);
    const { buscarVeiculoPorId } = useVeiculo();
    const { usuario } = useAuth();

    const [veiculo,setVeiculo] = useState<Veiculo|null>(null);

    useEffect(() =>
    {
        buscarDados();
    },[usuario]);

    const buscarDados = async ()=>{
      const oficinaId = usuario?.tipo === "OFICINA" ? usuario?.id : usuario?.oficinaId;
      if(!oficinaId){
        router.push("/veiculos")
        return;
      }

      const veiculoResult = await buscarVeiculoPorId(codigo, oficinaId)

      if (veiculoResult) setVeiculo(veiculoResult)
        else router.push("/veiculos")
    }
    
    if(!veiculo) return(<div className="p-8">Carregando dados...</div>)

    return(
      <div className="min-h-screen bg-zinc-100 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col gap-3 mb-8">
                <Link 
                    href="/veiculos" 
                    className="group flex items-center text-sm font-medium text-zinc-600 hover:text-zinc-800 transition-colors"
                >
                    <span className="mr-2 transition-transform group-hover:-translate-x-1">&larr;</span>
                    Voltar para listagem
                </Link>

                <div className="space-y-1 border-l-4 border-zinc-700 pl-4">
                    <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">
                        {codigo ? `Editar veículo #${codigo}` : 'Cadastro de novo veículo'}
                    </h1>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-6 md:p-10">
                <VeiculoForm veiculoExistente={veiculo} />
            </div>
        </div>
    </div>
    );
}
