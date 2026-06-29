'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Trash2, Save, ArrowLeft, Car, FileText, DollarSign, ListOrdered } from 'lucide-react'
import { buscarListaVeiculos } from '@/app/services/veiculosService'
import { osService } from '@/app/services/osService'
import { Veiculo } from '@/app/types/veiculos'
import { ItemOSRequest } from '@/app/types/os'

export default function NovaOSPage() {
    const router = useRouter()
    const [veiculos, setVeiculos] = useState<Veiculo[]>([])
    const [loading, setLoading] = useState(false)
    const [saving, setSaving] = useState(false)

    const [veiculoId, setVeiculoId] = useState<number>(0)
    const [descricao, setDescricao] = useState('')
    const [itens, setItens] = useState<ItemOSRequest[]>([])

    const [novoItemDesc, setNovoItemDesc] = useState('')
    const [novoItemValor, setNovoItemValor] = useState<number>(0)
    const [novoItemQtd, setNovoItemQtd] = useState<number>(1)

    

    const carregarVeiculos = async () => {
        try {
            setLoading(true)
            const dados = await buscarListaVeiculos()
            setVeiculos(dados)
        } catch (error) {
            console.error('Erro ao carregar veículos', error)
        } finally {
            setLoading(false)
        }
    }

    const adicionarItem = () => {
        if (!novoItemDesc || novoItemValor <= 0 || novoItemQtd <= 0) {
            alert('Preencha os campos do item corretamente.')
            return
        }

        const novoItem: ItemOSRequest = {
            descricao: novoItemDesc,
            valor: novoItemValor,
            quantidade: novoItemQtd
        }

        setItens([...itens, novoItem])
        setNovoItemDesc('')
        setNovoItemValor(0)
        setNovoItemQtd(1)
    }

    const removerItem = (index: number) => {
        setItens(itens.filter((_, i) => i !== index))
    }

    useEffect(() => {
        carregarVeiculos()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (veiculoId === 0) {
            alert('Selecione um veículo.')
            return
        }

        if (itens.length === 0) {
            alert('Adicione ao menos um item à ordem de serviço.')
            return
        }

        try {
            setSaving(true)
            await osService.salvar({
                veiculoId,
                descricao,
                itens
            })
            router.push('/os') // Redireciona para o Kanban após salvar
        } catch (error) {
            console.error('Erro ao salvar OS', error)
            alert('Erro ao salvar ordem de serviço.')
        } finally {
            setSaving(false)
        }
    }

    const totalOS = itens.reduce((acc, item) => acc + (item.valor * item.quantidade), 0)

    return (
        <div className="max-w-4xl mx-auto space-y-6 pb-10">
            <div className="flex items-center justify-between">
                <div>
                    <button 
                        onClick={() => router.back()}
                        className="flex items-center text-sm text-zinc-400 hover:text-white mb-2 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-1" /> Voltar
                    </button>
                    <h1 className="text-3xl font-bold text-white">Nova Ordem de Serviço</h1>
                    <p className="text-zinc-400">Preencha os dados abaixo para abrir uma nova OS.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Seção Veículo e Descrição */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
                    <div className="flex items-center gap-2 text-blue-400 mb-2">
                        <Car className="w-5 h-5" />
                        <h2 className="font-semibold text-lg">Informações Básicas</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Veículo</label>
                            <select
                                value={veiculoId}
                                onChange={(e) => setVeiculoId(Number(e.target.value))}
                                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                required
                            >
                                <option value={0}>Selecione um veículo...</option>
                                {veiculos.map(v => (
                                    <option key={v.id} value={v.id!}>
                                        {v.placa} - {v.marca} {v.modelo}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300">Descrição do Defeito / Serviço</label>
                        <div className="relative">
                            <FileText className="absolute left-3 top-3 w-5 h-5 text-zinc-500" />
                            <textarea
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] transition-all"
                                placeholder="Descreva o problema relatado pelo cliente..."
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Seção Itens da OS */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
                    <div className="flex items-center gap-2 text-green-400 mb-2">
                        <ListOrdered className="w-5 h-5" />
                        <h2 className="font-semibold text-lg">Itens e Serviços</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end bg-zinc-950 p-4 rounded-lg border border-zinc-800">
                        <div className="md:col-span-6 space-y-2">
                            <label className="text-xs font-medium text-zinc-500 uppercase">Descrição do Item</label>
                            <input
                                type="text"
                                value={novoItemDesc}
                                onChange={(e) => setNovoItemDesc(e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-green-500"
                                placeholder="Ex: Troca de Óleo"
                            />
                        </div>
                        <div className="md:col-span-3 space-y-2">
                            <label className="text-xs font-medium text-zinc-500 uppercase">Valor Unit.</label>
                            <div className="relative">
                                <DollarSign className="absolute left-2 top-2.5 w-4 h-4 text-zinc-500" />
                                <input
                                    type="number"
                                    step="0.01"
                                    value={novoItemValor}
                                    onChange={(e) => setNovoItemValor(Number(e.target.value))}
                                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg pl-7 pr-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-green-500"
                                />
                            </div>
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-xs font-medium text-zinc-500 uppercase">Qtd</label>
                            <input
                                type="number"
                                value={novoItemQtd}
                                onChange={(e) => setNovoItemQtd(Number(e.target.value))}
                                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-green-500"
                            />
                        </div>
                        <div className="md:col-span-1">
                            <button
                                type="button"
                                onClick={adicionarItem}
                                className="w-full bg-green-600 hover:bg-green-700 text-white p-2.5 rounded-lg transition-colors flex justify-center"
                                title="Adicionar Item"
                            >
                                <Plus className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="mt-4 border border-zinc-800 rounded-lg overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-zinc-800 text-zinc-400 text-xs uppercase">
                                <tr>
                                    <th className="px-4 py-2 font-medium">Item</th>
                                    <th className="px-4 py-2 font-medium text-right">Qtd</th>
                                    <th className="px-4 py-2 font-medium text-right">Unitário</th>
                                    <th className="px-4 py-2 font-medium text-right">Subtotal</th>
                                    <th className="px-4 py-2 font-medium text-center">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800">
                                {itens.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-4 py-8 text-center text-zinc-500">Nenhum item adicionado ainda.</td>
                                    </tr>
                                ) : (
                                    itens.map((item, index) => (
                                        <tr key={index} className="text-sm text-zinc-300 hover:bg-zinc-800/50 transition-colors">
                                            <td className="px-4 py-3">{item.descricao}</td>
                                            <td className="px-4 py-3 text-right">{item.quantidade}</td>
                                            <td className="px-4 py-3 text-right">R$ {item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                                            <td className="px-4 py-3 text-right font-medium text-white">
                                                R$ {(item.valor * item.quantidade).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <button
                                                    type="button"
                                                    onClick={() => removerItem(index)}
                                                    className="text-red-400 hover:text-red-300 transition-colors p-1"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                            <tfoot className="bg-zinc-800/50">
                                <tr>
                                    <td colSpan={3} className="px-4 py-3 text-right font-semibold text-zinc-400">Total da OS:</td>
                                    <td className="px-4 py-3 text-right font-bold text-green-400 text-lg">
                                        R$ {totalOS.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </td>
                                    <td></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={saving}
                        className={`
                            flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white transition-all
                            ${saving ? 'bg-zinc-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-900/20'}
                        `}
                    >
                        <Save className="w-5 h-5" />
                        {saving ? 'Salvando...' : 'Finalizar Ordem de Serviço'}
                    </button>
                </div>
            </form>
        </div>
    )
}
