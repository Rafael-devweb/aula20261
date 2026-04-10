'use client'
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UsuarioForm from "../../componentes/UsuarioForm";
import axios from "axios";
import { useAuth } from "@/app/context/AuthContext";

export default function EditarUsuario(){

    const params = useParams()
    const router = useRouter()
    const codigo = Number(params.codigo);
    const { usuario: usuarioLogado } = useAuth();

    const [usuario,setUsuario] = useState<any>(null);

    useEffect(() =>
    {
        buscarDados();
    },[usuarioLogado]);

    const buscarDados = async ()=>{
      const oficinaId = usuarioLogado?.tipo === "OFICINA" ? usuarioLogado?.id : usuarioLogado?.oficinaId;
      if(!oficinaId){
        router.push("/usuarios");
        return;
      }

      const user = await axios.get<any>('http://localhost:8080/usuarios/'+codigo+'?oficinaId='+oficinaId)

      if (user.data) setUsuario(user.data)
        else router.push("/usuarios")
    }
    
    if(!usuario) return(<div className="p-8">Carregando dados...</div>)

    return(
      <div className="min-h-screen bg-zinc-100 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col gap-3 mb-8">
                <Link 
                    href="/usuarios" 
                    className="group flex items-center text-sm font-medium text-zinc-600 hover:text-zinc-800 transition-colors"
                >
                    <span className="mr-2 transition-transform group-hover:-translate-x-1">&larr;</span>
                    Voltar para listagem
                </Link>

                <div className="space-y-1 border-l-4 border-zinc-700 pl-4">
                    <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">
                        {codigo ? `Editar funcionário #${codigo}` : 'Cadastro de novo funcionário'}
                    </h1>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-6 md:p-10">
                <UsuarioForm usuarioExistente={usuario} />
            </div>
        </div>
    </div>
    );
}
