'use client'

import { useEffect, useState } from 'react'
import { buscarListaOficinas, vincularOficina } from '@/app/services/oficinaService'
import { Oficina } from '@/app/types/oficina'
import { Building2, ShieldCheck, Search, Plus } from 'lucide-react'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { atualizarToken } from "@/app/redux/slices/authSlice";
import Cookies from 'js-cookie'


export default function ListaOficinas() {
    const [oficinas, setOficinas] = useState<Oficina[]>([])
    const [loading, setLoading] = useState(true)
    const [filtro, setFiltro] = useState('')
    const [processando, setProcessando] = useState<number | null>(null)
    const dispatch = useDispatch()

    useEffect(() => {
        carregarOficinas()
    }, [])

    const carregarOficinas = async () => {
        setLoading(true)
        try {
            const data = await buscarListaOficinas()
            setOficinas(data)
        } finally {
            setLoading(false)
        }
    }

    const handleVincular = async (id: number) => {
        if (!confirm('Deseja vincular seu usuário administrador a esta oficina? Você passará a ver os dados desta oficina.')) return
        
        setProcessando(id)
        try {
            const novoToken = await vincularOficina(id)
            dispatch(atualizarToken({ token: novoToken.token }))
            Cookies.set('token', novoToken.token, { expires: 7, secure: true })
            alert('Vinculado com sucesso! Recarregue a página para ver as mudanças.')
        } catch (error) {
            alert('Erro ao vincular oficina.')
        } finally {
            setProcessando(null)
        }
    }

    const oficinasFiltradas = oficinas.filter(o => 
        o.nomeFantasia.toLowerCase().includes(filtro.toLowerCase()) ||
        o.razaoSocial.toLowerCase().includes(filtro.toLowerCase()) ||
        o.cnpj.includes(filtro)
    )

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-zinc-100 flex items-center gap-3">
                    <Building2 className="h-8 w-8 text-blue-500" />
                    Gerenciamento de Oficinas
                </h1>
                
                <div className="flex items-center gap-4">
                    <Link 
                        href="/admin/oficinas/nova"
                        className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition-all"
                    >
                        <Plus className="h-4 w-4" />
                        Nova Oficina
                    </Link>

                    <div className="relative w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                        <input 
                            type="text" 
                            placeholder="Buscar oficina..."
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-2 pl-10 pr-4 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            value={filtro}
                            onChange={(e) => setFiltro(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="text-zinc-400">Carregando oficinas...</div>
            ) : (
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-lg">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-zinc-950 text-zinc-400 text-sm font-semibold border-b border-zinc-800">
                                <th className="px-6 py-4">Nome Fantasia</th>
                                <th className="px-6 py-4">Razão Social</th>
                                <th className="px-6 py-4">CNPJ</th>
                                <th className="px-6 py-4 text-center">Status</th>
                                <th className="px-6 py-4 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800">
                            {oficinasFiltradas.map(oficina => (
                                <tr key={oficina.id} className="hover:bg-zinc-800/50 transition-colors">
                                    <td className="px-6 py-4 text-zinc-100 font-medium">{oficina.nomeFantasia}</td>
                                    <td className="px-6 py-4 text-zinc-400">{oficina.razaoSocial}</td>
                                    <td className="px-6 py-4 text-zinc-400 font-mono">{oficina.cnpj}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center">
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                oficina.status === 'ATIVO' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                                            }`}>
                                                {oficina.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button 
                                            onClick={() => handleVincular(oficina.id)}
                                            disabled={processando === oficina.id}
                                            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all"
                                        >
                                            {processando === oficina.id ? 'Vinculando...' : (
                                                <>
                                                    <ShieldCheck className="h-4 w-4" />
                                                    Vincular Admin
                                                </>
                                            )}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {oficinasFiltradas.length === 0 && (
                        <div className="p-12 text-center text-zinc-500">
                            Nenhuma oficina encontrada.
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
