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
            restauranteId: usuarioLogado?.tipo === "RESTAURANTE" ? usuarioLogado.id : usuarioLogado?.restauranteId
        }
    );

    const router = useRouter();

    const handleChange = (campo: 'nome' | 'email' | 'senha', valor: string) => {
        setUsuario((prev: any) => ({ ...prev, [campo]: valor }))
    }

    const handleSalvar = async (formData: FormData) => {
       const restauranteId = usuarioLogado?.tipo === "RESTAURANTE" ? usuarioLogado.id : usuarioLogado?.restauranteId;

       const usuarioSalvar = {
            ...usuario,
            tipo: "FUNCIONARIO",
            restauranteId: restauranteId
       };

       if(usuario.id){
            var dadosAtualizar = await axios.put('http://localhost:8080/usuarios/'+usuario.id, usuarioSalvar);
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
                <label className="text-sm font-semibold text-amber-900">
                    Nome
                </label>
                <input
                    type="text"
                    required
                    value={usuario.nome}
                    onChange={(e) => handleChange('nome', e.target.value)}
                    placeholder="Nome do funcionário"
                    className="w-full px-4 py-3 rounded-xl border border-amber-200 focus:ring-2 focus:ring-amber-500 transition-all outline-none"
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-amber-900">
                    E-mail
                </label>
                <input
                    type="email"
                    placeholder="usuario@email.com"
                    required
                    value={usuario.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-amber-200 focus:ring-2 focus:ring-amber-500 transition-all outline-none"
                />
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-sm font-semibold text-amber-900">
                    Senha
                </label>
                <input
                    type="password"
                    placeholder="********"
                    required
                    value={usuario.senha || ''}
                    onChange={(e) => handleChange('senha', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-amber-200 focus:ring-2 focus:ring-amber-500 transition-all outline-none"
                />
            </div>

            <div className="md:col-span-2 flex items-center justify-end gap-6 pt-6 mt-6 border-t border-amber-100">
                <Link 
                    href="/usuarios" 
                    className="text-sm font-bold text-amber-900/60 hover:text-amber-900 transition-colors"
                >
                    CANCELAR
                </Link>
                <button 
                    type="submit" 
                    className="px-10 py-3 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-xl shadow-lg shadow-amber-200 transition-all active:scale-95"
                >
                    SALVAR ALTERAÇÕES
                </button>
            </div>
        </div>
    </form>
)
}
