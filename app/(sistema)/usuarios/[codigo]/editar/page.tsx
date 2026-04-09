'use client'
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UsuarioForm from "../../componentes/UsuarioForm";
import axios from "axios";

export default function EditarUsuario(){

    const params = useParams()
    const router = useRouter()
    const codigo = Number(params.codigo);

    const [usuario,setUsuario] = useState<any>(null);

    useEffect(() =>
    {
        buscarDados();
    },[]);

    const buscarDados = async ()=>{
      const user = await axios.get<any>('http://localhost:8080/usuarios/'+codigo)

      if (user.data) setUsuario(user.data)
        else router.push("/usuarios")
    }
    
    if(!usuario) return(<div className="p-8">Carregando dados...</div>)

    return(
      <div className="min-h-screen bg-amber-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col gap-3 mb-8">
                <Link 
                    href="/usuarios" 
                    className="group flex items-center text-sm font-medium text-amber-900/70 hover:text-amber-700 transition-colors"
                >
                    <span className="mr-2 transition-transform group-hover:-translate-x-1">&larr;</span>
                    Voltar para listagem
                </Link>

                <div className="space-y-1 border-l-4 border-amber-600 pl-4">
                    <h1 className="text-3xl font-bold text-amber-950 tracking-tight">
                        {codigo ? `Editar funcionário #${codigo}` : 'Cadastro de novo funcionário'}
                    </h1>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-6 md:p-10">
                <UsuarioForm usuarioExistente={usuario} />
            </div>
        </div>
    </div>
    );
}
