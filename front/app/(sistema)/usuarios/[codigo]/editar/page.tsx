'use client'
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UsuarioForm from "../../componentes/UsuarioForm";
import { store } from "@/app/redux/store";
import { buscarUsuarioPorId } from "@/app/services/usuarioService";
import { Usuario } from "@/app/types/usuarios";


export default function EditarUsuario() {

    const params = useParams()
    const router = useRouter()
    const codigo = params.codigo as string;
    const usuarioLogado = store.getState().auth.usuario


    const [usuario, setUsuario] = useState<Usuario | null>(null);



    useEffect(() => {
        buscarDados();
    }, [usuarioLogado]);

    const buscarDados = async () => {
        const oficinaId = usuarioLogado?.tipo === "OFICINA" ? usuarioLogado?.id : usuarioLogado?.oficinaId;
        if (!oficinaId) {
            router.push("/usuarios");
            return;
        }

        const user = await buscarUsuarioPorId(codigo, oficinaId);

        if (user) setUsuario(user)
        else router.push("/usuarios")
    }

    if (!usuario) return (<div className="p-8">Carregando dados...</div>)

    return (
        <div className="w-full min-h-screen bg-black text-zinc-100 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">

                {/* Navegação e Cabeçalho Dinâmico */}
                <div className="flex flex-col gap-4 mb-8">
                    <Link
                        href="/usuarios"
                        className="group inline-flex items-center text-xs font-bold uppercase tracking-wider text-zinc-500 hover:text-zinc-300 transition-colors w-fit"
                    >
                        <span className="mr-2 text-sm transition-transform group-hover:-translate-x-1">&larr;</span>
                        Voltar para listagem
                    </Link>

                    <div className="space-y-1 border-l-4 border-blue-600 pl-4">
                        <h1 className="text-3xl font-bold text-white tracking-tight">
                            {codigo ? (
                                <>
                                    Editar Funcionário <span className="font-mono text-zinc-500 font-normal">#{codigo}</span>
                                </>
                            ) : (
                                'Cadastro de Novo Funcionário'
                            )}
                        </h1>
                        <p className="text-sm text-zinc-400">
                            {codigo ? 'Atualize as credenciais e permissões do registro.' : 'Insira os dados operacionais do novo colaborador.'}
                        </p>
                    </div>
                </div>

                {/* Painel do Formulário */}
                <div className="bg-zinc-900 rounded-2xl shadow-2xl shadow-black/40 border border-zinc-800 p-6 md:p-10">
                    <UsuarioForm usuarioExistente={usuario} />
                </div>

            </div>
        </div>
    );
}
