'use client'

import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Usuario } from "../types/usuarios";
import { LoginResponse } from "../types/auth";



export default function LoginPage() {
    const router = useRouter();
    const {login} = useAuth();


    const handleLogin = async ( formData : FormData) => {

        const email = formData.get("email");
        const senha = formData.get("senha");

        try{
            var loginResult = await axios.post<LoginResponse>('http://localhost:8080/auth/login',
                {email:email,senha:senha});

            if(loginResult.status !== 200){
                alert("Credenciais inválidas!")
                return;
            }

            const usuarioLogin = new Usuario(
                loginResult.data.id,
                loginResult.data.nome,
                loginResult.data.email,
                loginResult.data.status,
                loginResult.data.tipo,
                loginResult.data.oficinaId
            );
            login(usuarioLogin,loginResult.data.token);

        }catch(error){
            alert("Erro ao autenticar no AutoFix!")
            return;
        }

        router.push("/home")
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-800 via-slate-800 to-zinc-900 px-4">
            <div className="w-full max-w-md bg-zinc-900 rounded-2xl shadow-xl p-8 border border-zinc-700">

                <div className="mb-8 text-center">
                    <p className="text-xs uppercase tracking-[0.2em] font-semibold text-slate-300 mb-2">AutoFix</p>
                    <h1 className="text-3xl font-bold text-white tracking-tight">
                        Login da Oficina
                    </h1>
                </div>

                <form action={handleLogin} className="space-y-6">

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-200 block">
                            E-mail
                        </label>
                        <input
                            name="email"
                            type="email"
                            placeholder="oficina@email.com"
                            className="w-full px-4 py-3 rounded-lg border border-zinc-600 bg-zinc-800 text-white focus:ring-2 focus:ring-slate-400 focus:border-slate-400 outline-none transition-all placeholder:text-zinc-400"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-slate-200 block">
                                Senha
                            </label>
                        </div>
                        <input
                            name="senha"
                            type="password"
                            placeholder="********"
                            className="w-full px-4 py-3 rounded-lg border border-zinc-600 bg-zinc-800 text-white focus:ring-2 focus:ring-slate-400 focus:border-slate-400 outline-none transition-all"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-slate-500 hover:bg-slate-400 text-zinc-900 font-semibold py-3 rounded-lg transition-colors shadow-lg shadow-zinc-900/40 active:scale-[0.98]"
                    >
                        Entrar no Painel
                    </button>
                </form>
            </div>
        </div>
    );
}
