'use client'
import { useAuth } from "@/app/context/AuthContext";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react"

interface UsuarioFormProps {
    usuarioExistente?: any
}

export default function UsuarioForm({ usuarioExistente }: UsuarioFormProps) {
    const { usuario: usuarioLogado } = useAuth();

    const [usuario, setUsuario] = useState<any>(
        usuarioExistente || {
            id: null,
            nome: '',
            email: '',
            senha: '',
            status: 'ATIVO',
            tipo: 'FUNCIONARIO',
            oficinaId: usuarioLogado?.tipo === "OFICINA" ? usuarioLogado.id : usuarioLogado?.oficinaId
        }
    );

    const router = useRouter();

    const handleChange = (campo: 'nome' | 'email' | 'senha', valor: string) => {
        setUsuario((prev: any) => ({ ...prev, [campo]: valor }))
    }

    const handleSalvar = async (formData: FormData) => {
       const oficinaId = usuarioLogado?.tipo === "OFICINA" ? usuarioLogado.id : usuarioLogado?.oficinaId;
       if(!oficinaId){
        return;
       }

       const usuarioSalvar = {
            ...usuario,
            tipo: "FUNCIONARIO",
            oficinaId: oficinaId
       };

       if(usuario.id){
            var dadosAtualizar = await axios.put('http://localhost:8080/usuarios/'+usuario.id+'?oficinaId='+oficinaId, usuarioSalvar);
            if(dadosAtualizar.status!== 200){
                return;
            }
            alert("Funcionário atualizado com sucesso!")
            router.push("/usuarios")
            return;
       }

       var dadosResult = await axios.post<number>('http://localhost:8080/usuarios', usuarioSalvar);

       if(dadosResult.status!== 200){
        return;
       }

        alert("Funcionário salvo com sucesso! Código: " + dadosResult.data )
        router.push("/usuarios")
    }


    return (
       <form action={handleSalvar} className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-zinc-800">
                    Nome
                </label>
                <input
                    type="text"
                    required
                    value={usuario.nome}
                    onChange={(e) => handleChange('nome', e.target.value)}
                    placeholder="Nome do funcionário"
                    className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-slate-400 transition-all outline-none"
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-zinc-800">
                    E-mail
                </label>
                <input
                    type="email"
                    placeholder="usuario@email.com"
                    required
                    value={usuario.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-slate-400 transition-all outline-none"
                />
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-sm font-semibold text-zinc-800">
                    Senha
                </label>
                <input
                    type="password"
                    placeholder="********"
                    required
                    value={usuario.senha || ''}
                    onChange={(e) => handleChange('senha', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-slate-400 transition-all outline-none"
                />
            </div>

            <div className="md:col-span-2 flex items-center justify-end gap-6 pt-6 mt-6 border-t border-zinc-200">
                <Link 
                    href="/usuarios" 
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
