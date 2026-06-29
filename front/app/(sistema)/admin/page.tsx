'use client'

import { useEffect, useState } from 'react'
import { buscarEstatisticas } from '@/app/services/oficinaService'
import { DashboardStats } from '@/app/types/oficina'
import { Building2, Users, UserSquare2, Car, ClipboardList } from 'lucide-react'

export default function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        buscarEstatisticas()
            .then(setStats)
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <div className="p-8">Carregando estatísticas...</div>

    const cards = [
        { title: 'Total Oficinas', value: stats?.totalOficinas, icon: Building2, color: 'text-blue-600' },
        { title: 'Total Usuários', value: stats?.totalUsuarios, icon: Users, color: 'text-green-600' },
        { title: 'Total Clientes', value: stats?.totalClientes, icon: UserSquare2, color: 'text-purple-600' },
        { title: 'Total Veículos', value: stats?.totalVeiculos, icon: Car, color: 'text-orange-600' },
        { title: 'Ordens de Serviço', value: stats?.totalOS, icon: ClipboardList, color: 'text-red-600' },
    ]

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8 text-zinc-100">Painel do Administrador</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {cards.map((card) => (
                    <div key={card.title} className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <card.icon className={`h-8 w-8 ${card.color}`} />
                            <span className="text-2xl font-bold text-zinc-100">{card.value}</span>
                        </div>
                        <p className="text-sm font-medium text-zinc-400">{card.title}</p>
                    </div>
                ))}
            </div>

            <div className="mt-12 p-6 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-300">
                <h2 className="text-xl font-semibold mb-4 text-zinc-100">Bem-vindo, Administrador</h2>
                <p>Este painel oferece uma visão geral de todo o ecossistema AutoFix.</p>
                <p className="mt-2 text-sm text-zinc-500 italic">Dica: Utilize o menu lateral para gerenciar as oficinas cadastradas.</p>
            </div>
        </div>
    )
}
