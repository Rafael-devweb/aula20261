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

            alert("Restaurante cadastrado com sucesso! Agora faça login.")
            router.push("/login")
        }catch(error){
            alert("Erro ao cadastrar restaurante!")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-white px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-amber-100">
                <div className="mb-8 text-center">
                    <p className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-700 mb-2">ChefOrder</p>
                    <h1 className="text-3xl font-bold text-amber-950 tracking-tight">
                        Cadastro de Restaurante
                    </h1>
                </div>

                <form action={handleCadastro} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-amber-900 block">
                            Nome
                        </label>
                        <input
                            name="nome"
                            type="text"
                            required
                            placeholder="Nome do restaurante"
                            className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all placeholder:text-amber-400"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-amber-900 block">
                            E-mail
                        </label>
                        <input
                            name="email"
                            type="email"
                            required
                            placeholder="restaurante@cheforder.com"
                            className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all placeholder:text-amber-400"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-amber-900 block">
                            Senha
                        </label>
                        <input
                            name="senha"
                            type="password"
                            required
                            placeholder="********"
                            className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3 rounded-lg transition-colors shadow-lg shadow-amber-200 active:scale-[0.98]"
                    >
                        Cadastrar Restaurante
                    </button>
                </form>
            </div>
        </div>
    );
}
