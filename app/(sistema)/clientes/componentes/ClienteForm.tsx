'use client'
import { useAuth } from "@/app/context/AuthContext";
import { Mesa, useMesa } from "@/app/context/MesaContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react"

interface ClienteFormProps {
    usuarioExistente?: Mesa
}

export default function ClienteForm({ usuarioExistente }: ClienteFormProps) {
    const { usuario } = useAuth();
    const { salvarMesa, atualizarMesa } = useMesa();

    const [mesa, setMesa] = useState<Mesa>(
        usuarioExistente || new Mesa(null, '', 'LIVRE', usuario?.tipo === "RESTAURANTE" ? usuario.id : usuario?.restauranteId)
    );

    const router = useRouter();

    const handleChange = (valor: string) => {
        setMesa(prev =>
            new Mesa(
                prev.id,
                valor,
                prev.status,
                prev.restauranteId
            )
        )
    }

    const handleSalvar = async (formData: FormData) => {
        const restauranteId = usuario?.tipo === "RESTAURANTE" ? usuario.id : usuario?.restauranteId;
        const mesaSalvar = new Mesa(mesa.id, mesa.numero, mesa.status, restauranteId || null);

        if(mesaSalvar.id){
            await atualizarMesa(mesaSalvar);
            alert("Mesa atualizada com sucesso!")
        }else{
            await salvarMesa(mesaSalvar);
            alert("Mesa salva com sucesso!")
        }

        router.push("/clientes")
    }

    return (
       <form action={handleSalvar} className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-sm font-semibold text-amber-900">
                    Número da mesa
                </label>
                <input
                    type="text"
                    required
                    maxLength={14}
                    value={mesa.numero}
                    onChange={(e) => handleChange(e.target.value)}
                    placeholder="12"
                    className="w-full px-4 py-3 rounded-xl border border-amber-200 focus:ring-2 focus:ring-amber-500 transition-all outline-none"
                />
            </div>

            <div className="md:col-span-2 flex items-center justify-end gap-6 pt-6 mt-6 border-t border-amber-100">
                <Link 
                    href="/clientes" 
                    className="text-sm font-bold text-amber-900/60 hover:text-amber-900 transition-colors"
                >
                    CANCELAR
                </Link>
                <button 
                    type="submit" 
                    className="px-10 py-3 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-xl shadow-lg shadow-amber-200 transition-all active:scale-95"
                >
                    SALVAR ALTERAÇÕES
                </button>
            </div>
        </div>
    </form>
)
}
