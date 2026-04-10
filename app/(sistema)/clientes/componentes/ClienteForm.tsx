'use client'
import { useAuth } from "@/app/context/AuthContext";
import { Cliente, useCliente } from "@/app/context/ClienteContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react"

interface ClienteFormProps {
    clienteExistente?: Cliente
}

export default function ClienteForm({ clienteExistente }: ClienteFormProps) {
    const { usuario } = useAuth();
    const { salvarCliente, atualizarCliente } = useCliente();

    const [cliente, setCliente] = useState<Cliente>(
        clienteExistente || new Cliente(null, '', '', usuario?.tipo === "OFICINA" ? usuario.id : usuario?.oficinaId)
    );

    const router = useRouter();

    const handleChange = (campo: 'nome' | 'telefone', valor: string) => {
        setCliente(prev =>
            new Cliente(
                prev.id,
                campo === 'nome' ? valor : prev.nome,
                campo === 'telefone' ? valor : prev.telefone,
                prev.oficinaId
            )
        )
    }

    const handleSalvar = async (formData: FormData) => {
        const oficinaId = usuario?.tipo === "OFICINA" ? usuario.id : usuario?.oficinaId;
        if(!oficinaId){
            return;
        }
        const clienteSalvar = new Cliente(cliente.id, cliente.nome, cliente.telefone, oficinaId || null);

        if(clienteSalvar.id){
            await atualizarCliente(clienteSalvar);
            alert("Cliente atualizado com sucesso!")
        }else{
            await salvarCliente(clienteSalvar);
            alert("Cliente salvo com sucesso!")
        }

        router.push("/clientes")
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
                    value={cliente.nome}
                    onChange={(e) => handleChange('nome', e.target.value)}
                    placeholder="Nome do cliente"
                    className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-slate-400 transition-all outline-none"
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-zinc-800">
                    Telefone
                </label>
                <input
                    type="text"
                    required
                    value={cliente.telefone}
                    onChange={(e) => handleChange('telefone', e.target.value)}
                    placeholder="(00) 00000-0000"
                    className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-slate-400 transition-all outline-none"
                />
            </div>

            <div className="md:col-span-2 flex items-center justify-end gap-6 pt-6 mt-6 border-t border-zinc-200">
                <Link 
                    href="/clientes" 
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
