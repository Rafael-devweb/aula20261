'use client'
import { Usuario } from "@/app/context/AuthContext"
import { UsuarioMock } from "@/app/mock/usuario";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react"

interface ClienteFormProps {
    usuarioExistente?: Usuario
}


export default function ClienteForm({ usuarioExistente }: ClienteFormProps) {


    const [usuario, setUsuario] = useState<Usuario>(
        usuarioExistente || new Usuario(0, '', '', true)
    );

    const router = useRouter();

    const handleChange = (campo: 'nome' | 'cpf', valor: string) => {
        setUsuario(prev =>
            new Usuario(
                prev.codigo,
                campo === 'nome' ? valor : prev.nome,
                campo === 'cpf' ? valor : prev.cpf,
                prev.ativo
            )
        )
    }

    const handleSalvar = async (formData: FormData) => {

        await UsuarioMock.salvar(usuario);


        alert("Cliente salvo com sucesso!")


        router.push("/clientes")


    }


    return (
       <form action={handleSalvar} className="w-full">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Campo: Nome (Ocupa 1 coluna no grid) */}
        <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">
                Nome completo
            </label>
            <input
                type="text"
                required
                value={usuario.nome}
                onChange={(e) => handleChange('nome', e.target.value)}
                placeholder="João da Silva Sauro"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
            />
        </div>

        {/* Campo: CPF (Ocupa a outra coluna no grid) */}
        <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">
                CPF
            </label>
            <input
                type="text"
                required
                maxLength={14}
                value={usuario.cpf}
                onChange={(e) => handleChange('cpf', e.target.value)}
                placeholder="000.000.000-00"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
            />
        </div>

        {/* Se você adicionar mais campos aqui, eles seguirão o padrão 2x2 automaticamente */}

        {/* Área de Botões - Fazemos ela ocupar as 2 colunas (col-span-full) */}
        <div className="md:col-span-2 flex items-center justify-end gap-6 pt-6 mt-6 border-t border-slate-100">
            <Link 
                href="/clientes" 
                className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors"
            >
                CANCELAR
            </Link>
            <button 
                type="submit" 
                className="px-10 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95"
            >
                SALVAR ALTERAÇÕES
            </button>
        </div>
    </div>
</form>
)
}