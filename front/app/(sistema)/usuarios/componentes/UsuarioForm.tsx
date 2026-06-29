'use client'
import { store } from "@/app/redux/store";
import { Usuario, UsuarioFormProps } from "@/app/types/usuarios";
import { salvarUsuario, atualizarUsuario } from "@/app/services/usuarioService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function UsuarioForm({ usuarioExistente }: UsuarioFormProps) {

    const usuarioLogado = store.getState().auth.usuario
    const [usuario, setUsuario] = useState<Usuario>(
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
        setUsuario((prev: Usuario) => ({ ...prev, [campo]: valor }))
    }

    const handleSalvar = async (formData: FormData) => {
        const oficinaId = usuarioLogado?.tipo === "OFICINA" ? usuarioLogado.id : usuarioLogado?.oficinaId;
        if (!oficinaId) {
            return;
        }

        const usuarioSalvar = {
            ...usuario,
            tipo: "FUNCIONARIO",
            oficinaId: oficinaId
        };

        if (usuario.id) {
            const sucesso = await atualizarUsuario(usuario.id, usuarioSalvar, oficinaId);
            if (!sucesso) {
                return;
            }
            alert("Funcionário atualizado com sucesso!")
            router.push("/usuarios")
            return;
        }

        const codigo = await salvarUsuario(usuarioSalvar);

        if (!codigo) {
            return;
        }

        alert("Funcionário salvo com sucesso! Código: " + codigo)
        router.push("/usuarios")
    }


    return (
        <form action={handleSalvar} className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Campo: Nome */}
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                        Nome do Colaborador
                    </label>
                    <input
                        type="text"
                        required
                        value={usuario.nome}
                        onChange={(e) => handleChange('nome', e.target.value)}
                        placeholder="Ex: João Silva"
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none text-sm font-medium"
                    />
                </div>

                {/* Campo: E-mail */}
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                        E-mail de Acesso
                    </label>
                    <input
                        type="email"
                        placeholder="joao@oficina.com"
                        required
                        value={usuario.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none text-sm font-medium"
                    />
                </div>

                {/* Campo: Senha */}
                <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                        Senha de Segurança
                    </label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        required
                        value={usuario.senha || ''}
                        onChange={(e) => handleChange('senha', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none text-sm font-mono tracking-widest"
                    />
                </div>

                {/* Ações do Formulário / Rodapé */}
                <div className="md:col-span-2 flex items-center justify-end gap-6 pt-6 mt-4 border-t border-zinc-800/60">
                    <Link
                        href="/usuarios"
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
