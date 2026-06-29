'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { criarOficina } from '@/app/services/oficinaService'
import { OficinaRequest } from '@/app/types/oficina'
import { Building2, Save, X, Mail, Lock, User } from 'lucide-react'
import Link from 'next/link'

export default function NovaOficina() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState<OficinaRequest>({
        razaoSocial: '',
        nomeFantasia: '',
        cnpj: '',
        usuario: {
            email: '',
            senha: ''
        }
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            await criarOficina(form)
            alert('Oficina criada com sucesso!')
            router.push('/admin/oficinas')
        } catch (error: any) {
            alert(error.response?.data?.message || 'Erro ao criar oficina.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
                <Building2 className="h-8 w-8 text-blue-500" />
                <h1 className="text-3xl font-bold text-zinc-100">Cadastrar Nova Oficina</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-lg">
                    <h2 className="text-xl font-semibold text-zinc-100 mb-6 flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-zinc-400" />
                        Dados da Empresa
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">Nome Fantasia</label>
                            <input
                                required
                                type="text"
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2.5 px-4 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                placeholder="AutoFix Mecânica"
                                value={form.nomeFantasia}
                                onChange={e => setForm({ ...form, nomeFantasia: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">Razão Social</label>
                            <input
                                required
                                type="text"
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2.5 px-4 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                placeholder="AutoFix Ltda"
                                value={form.razaoSocial}
                                onChange={e => setForm({ ...form, razaoSocial: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">CNPJ</label>
                            <input
                                required
                                type="text"
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2.5 px-4 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-mono"
                                placeholder="00.000.000/0001-00"
                                value={form.cnpj}
                                onChange={e => setForm({ ...form, cnpj: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-lg">
                    <h2 className="text-xl font-semibold text-zinc-100 mb-6 flex items-center gap-2">
                        <User className="h-5 w-5 text-zinc-400" />
                        Usuário Administrador da Oficina
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                                <Mail className="h-4 w-4" /> E-mail
                            </label>
                            <input
                                required
                                type="email"
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2.5 px-4 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                placeholder="admin@oficina.com"
                                value={form.usuario.email}
                                onChange={e => setForm({ 
                                    ...form, 
                                    usuario: { ...form.usuario, email: e.target.value } 
                                })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                                <Lock className="h-4 w-4" /> Senha
                            </label>
                            <input
                                required
                                type="password"
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2.5 px-4 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                placeholder="••••••••"
                                value={form.usuario.senha}
                                onChange={e => setForm({ 
                                    ...form, 
                                    usuario: { ...form.usuario, senha: e.target.value } 
                                })}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <Link
                        href="/admin/oficinas"
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-all font-medium"
                    >
                        <X className="h-4 w-4" />
                        Cancelar
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium px-8 py-2.5 rounded-lg transition-all shadow-lg shadow-blue-900/20"
                    >
                        <Save className="h-4 w-4" />
                        {loading ? 'Salvando...' : 'Salvar Oficina'}
                    </button>
                </div>
            </form>
        </div>
    )
}
