'use client'

import { useRouter } from "next/navigation";
import { useAuth, Usuario } from "../context/AuthContext";
import axios from "axios";

interface LoginResponse{
    token: string
}

export default function LoginPage() {
    const router = useRouter();
    const {login} = useAuth();


    const handleLogin = async ( formData : FormData) => {

        const email = formData.get("email");
        const senha = formData.get("senha");

        try{
            
            debugger;
            // var loginResult = await fetch("http://localhost:8080/auth/login",{
            //     method :'POST',
            //     headers:{
            //         'Content-Type':'application/json'
            //     },
            //     body: JSON.stringify({email:email,senha:senha})
            // });

            var loginResult = await axios.post<LoginResponse>('http://localhost:8080/auth/login',
                {email:email,senha:senha});

            if(loginResult.status !== 200){
                alert("Usuario ou senha invalido!")
                return;
            }

            const usuarioMock = new Usuario(1,"Professor Samuel Matos","","ATIVO");
          
            
            login(usuarioMock,loginResult.data.token);


        }catch(error){
            alert("Erro ao entrar no sistema!")
        }
       

        console.log(`autenticado com email: ${email}`)

        router.push("/home")
    }


    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">

                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                        Entrar no Sistema
                    </h1>
                </div>

                <form action={handleLogin} className="space-y-6">

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 block">
                            E-mail
                        </label>
                        <input
                            name="email"
                            type="email"
                            placeholder="seu@email.com"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-700 block">
                                Senha
                            </label>
                        </div>
                        <input
                            name="senha"
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors shadow-lg shadow-blue-200 active:scale-[0.98]"
                    >
                        Acessar
                    </button>
                </form>
            </div>
        </div>
    );
}