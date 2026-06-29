import Link from "next/link";
import UsuarioForm from "../componentes/UsuarioForm";

export default function cadastrarUsuario() {
    return (
        <div className="w-full min-h-screen bg-black text-zinc-100 p-4 md:p-10">
            <div className="max-w-7xl mx-auto">

                {/* Navegação e Cabeçalho */}
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
                            Novo Funcionário
                        </h1>
                        <p className="text-sm text-zinc-400">
                            Preencha os dados operacionais para registrar o novo colaborador no sistema.
                        </p>
                    </div>
                </div>

                {/* Container do Formulário */}
                <div className="bg-zinc-900 rounded-2xl shadow-2xl shadow-black/40 border border-zinc-800 p-6 md:p-8">
                    <UsuarioForm />
                </div>

            </div>
        </div>
    );
}
