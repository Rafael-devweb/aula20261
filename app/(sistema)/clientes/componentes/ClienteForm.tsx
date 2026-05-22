'use client'
import { atualizarCliente, salvarCliente } from "@/app/services/clienteService";
import { Cliente, ClienteFormProps } from "@/app/types/cliente";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function ClienteForm({ clienteExistente }: ClienteFormProps) {

    // Inicializa o estado exatamente como o professor: 
    // Se não existir, cria um objeto vazio usando os valores padrão da sua classe
    const [cliente, setCliente] = useState<Cliente>(
        clienteExistente || new Cliente()
    );

    const router = useRouter();

    // handleChange reconstrói o objeto respeitando a ordem exata das propriedades da sua classe
    const handleChange = (campo: 'nome' | 'telefone', valor: string) => {
        setCliente(prev =>
            new Cliente(
                prev.id,
                campo === 'nome' ? valor : prev.nome,
                prev.cpfCnpj, // mantido na posição correta
                campo === 'telefone' ? valor : prev.telefone,
                prev.email,   // mantido na posição correta
                prev.endereco,// mantido na posição correta
                prev.oficinaId
            )
        )
    }

    const handleSalvar = async (formData: FormData) => {

        if (clienteExistente) {
            var dadosResult = await atualizarCliente(cliente);
         
            alert(dadosResult);

        } else {
            var dadosResult = await salvarCliente(cliente)

            if (dadosResult === undefined) {
                return;
            }
            alert("Cliente salvo com sucesso! Código:" + dadosResult)
        }

        router.push("/clientes")
    }

    return (
        <form action={handleSalvar} className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Campo: Nome */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-zinc-800">
                        Nome completo
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

                {/* Campo: Telefone */}
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

                {/* Área de Botões */}
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