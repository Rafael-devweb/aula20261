'use client'
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ClienteForm from "../../componentes/ClienteForm";
import { Mesa, useMesa } from "@/app/context/MesaContext";

export default function EditarCliente(){

    const params = useParams()
    const router = useRouter()
    const codigo = Number(params.codigo);
    const { buscarMesaPorId } = useMesa();

    const [mesa,setMesa] = useState<Mesa|null>(null);

    useEffect(() =>
    {
        buscarDados();
    },[]);

    const buscarDados = async ()=>{
      const mesaResult = await buscarMesaPorId(codigo)

      if (mesaResult) setMesa(mesaResult)
        else router.push("/clientes")
    }
    
    if(!mesa) return(<div className="p-8">Carregando dados...</div>)

    return(
      <div className="min-h-screen bg-amber-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col gap-3 mb-8">
                <Link 
                    href="/clientes" 
                    className="group flex items-center text-sm font-medium text-amber-900/70 hover:text-amber-700 transition-colors"
                >
                    <span className="mr-2 transition-transform group-hover:-translate-x-1">&larr;</span>
                    Voltar para listagem
                </Link>

                <div className="space-y-1 border-l-4 border-amber-600 pl-4">
                    <h1 className="text-3xl font-bold text-amber-950 tracking-tight">
                        {codigo ? `Editar mesa #${codigo}` : 'Cadastro de nova mesa'}
                    </h1>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-6 md:p-10">
                <ClienteForm usuarioExistente={mesa} />
            </div>
        </div>
    </div>
    );
}
