import Link from "next/link";
import ClienteForm from "../componentes/ClienteForm";

export default function cadastrarCliente() {
    return (
        <div className="w-full min-h-screen bg-amber-50 p-4 md:p-10">
            <div className="max-w-7xl mx-auto"> 
                <div className="flex flex-col gap-3 mb-8">
                    <Link
                        href="/clientes"
                        className="group flex items-center text-sm font-medium text-amber-900/70 hover:text-amber-700 transition-colors"
                    >
                        <span className="mr-2 transition-transform group-hover:-translate-x-1">&larr;</span>
                        Voltar para listagem
                    </Link>

                    <div className="space-y-1 border-l-4 border-amber-600 pl-4">
                        <h1 className="text-3xl font-bold text-amber-950 tracking-tight">
                            Nova Mesa
                        </h1>
                        <p className="text-sm text-amber-900/70">
                            Preencha os dados para registrar uma nova mesa no salão.
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-6 md:p-8">
                    <ClienteForm />
                </div>
            </div>
        </div>
    );
}
