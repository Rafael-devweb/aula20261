'use client'

import axios from "axios";
import { useRouter } from "next/navigation";

export default function CadastroPage() {
    const router = useRouter();

    const handleCadastro = async (formData: FormData) => {
        const nome = formData.get("nome");
        const email = formData.get("email");
        const senha = formData.get("senha");

        try{
            const cadastroResult = await axios.post<number>('http://localhost:8080/auth/cadastro',
                {nome:nome,email:email,senha:senha});

            if(cadastroResult.status !== 200){
                alert("Não foi possível concluir o cadastro!")
                return;
            }

            alert("Oficina cadastrada com sucesso! Agora faça login.")
            router.push("/login")
        }catch(error){
            alert("Erro ao cadastrar oficina!")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-800 via-slate-800 to-zinc-900 px-4">
            <div className="w-full max-w-md bg-zinc-900 rounded-2xl shadow-xl p-8 border border-zinc-700">
                <div className="mb-8 text-center">
                    <p className="text-xs uppercase tracking-[0.2em] font-semibold text-slate-300 mb-2">AutoFix</p>
                    <h1 className="text-3xl font-bold text-white tracking-tight">
                        Cadastro de Oficina
                    </h1>
                </div>

                <form action={handleCadastro} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-200 block">
                            Nome fantasia
                        </label>
                        <input
                            name="nome"
                            type="text"
                            required
                            placeholder="Nome da oficina"
                            className="w-full px-4 py-3 rounded-lg border border-zinc-600 bg-zinc-800 text-white focus:ring-2 focus:ring-slate-400 focus:border-slate-400 outline-none transition-all placeholder:text-zinc-400"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-200 block">
                            E-mail
                        </label>
                        <input
                            name="email"
                            type="email"
                            required
                            placeholder="oficina@autofix.com"
                            className="w-full px-4 py-3 rounded-lg border border-zinc-600 bg-zinc-800 text-white focus:ring-2 focus:ring-slate-400 focus:border-slate-400 outline-none transition-all placeholder:text-zinc-400"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-200 block">
                            Senha
                        </label>
                        <input
                            name="senha"
                            type="password"
                            required
                            placeholder="********"
                            className="w-full px-4 py-3 rounded-lg border border-zinc-600 bg-zinc-800 text-white focus:ring-2 focus:ring-slate-400 focus:border-slate-400 outline-none transition-all"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-slate-500 hover:bg-slate-400 text-zinc-900 font-semibold py-3 rounded-lg transition-colors shadow-lg shadow-zinc-900/40 active:scale-[0.98]"
                    >
                        Cadastrar Oficina
                    </button>
                </form>
            </div>
        </div>
    );
}
