import Link from "next/link";
import UsuarioForm from "../componentes/UsuarioForm";

export default function cadastrarUsuario() {
    return (
        <div className="w-full min-h-screen bg-zinc-100 p-4 md:p-10">
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
                            Novo Funcionário
                        </h1>
                        <p className="text-sm text-zinc-600">
                            Preencha os dados para registrar um novo funcionário.
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-6 md:p-8">
                    <UsuarioForm />
                </div>
            </div>
        </div>
    );
}
