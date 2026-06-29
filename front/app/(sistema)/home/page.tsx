'use client'

import { store } from "@/app/redux/store";
import { buscarListaClientes } from "@/app/services/clienteService";
import { buscarListaVeiculos } from "@/app/services/veiculosService";
import { Cliente } from "@/app/types/cliente";
import { Veiculo } from "@/app/types/veiculos";
import { useEffect, useState } from "react";

export default function Home() {

    const [veiculos, setVeiculo] = useState<Veiculo[]>([]);
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const usuario = store.getState().auth.usuario;

    useEffect(() => {
        carregarDados();
    }, [usuario]);

    const carregarDados = async () => {
        const oficinaId = usuario?.tipo === "OFICINA" ? usuario?.id : usuario?.oficinaId;
        if (oficinaId) {

            var dadosCliente = await buscarListaClientes();

            var dadosVeiculo = await buscarListaVeiculos();

            setVeiculo(dadosVeiculo);
            setClientes(dadosCliente);
        }
    }
    return (
        <div className="space-y-6 pb-12">
            {/* Banner de Boas-Vindas Tático */}
            <div className="space-y-6 pb-12">
                {/* Banner com Glow Industrial 100% CSS */}
                <div className="group relative rounded-2xl border border-zinc-800 bg-zinc-950 p-6 md:p-8 shadow-xl shadow-black/30 overflow-hidden transition-all duration-500 hover:border-blue-500/30">

                    {/* A Lâmpada Cibernética (Ativa no Hover) */}
                    <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-600/0 rounded-full blur-[100px] transition-all duration-700 group-hover:bg-blue-600/15 group-hover:scale-125 pointer-events-none" />

                    {/* Conteúdo */}
                    <div className="relative z-10">
                        <p className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-blue-400">
                            AutoFix // Sistema de Telemetria
                        </p>
                        <h1 className="mt-2 text-3xl font-bold text-white tracking-tight">
                            Painel Operacional
                        </h1>
                        <p className="mt-2 text-zinc-400 text-sm max-w-2xl leading-relaxed">
                            Bem-vindo, <span className="text-zinc-200 font-semibold">{usuario?.nome || 'Oficina'}</span>. Gerencie clientes, veículos e equipe do seu ambiente técnico em tempo real.
                        </p>
                    </div>
                </div>
            </div>

            {/* Grid de KPIs / Métricas */}
            <div className="grid gap-6 md:grid-cols-2">
                {/* Card: Clientes */}
                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg shadow-black/10 group hover:border-zinc-700 transition-colors">
                    <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 group-hover:text-zinc-400 transition-colors">
                        Clientes Cadastrados
                    </p>
                    <p className="text-4xl font-mono font-bold text-white mt-3 tracking-tight">
                        {clientes.length.toString().padStart(2, '0')}
                    </p>
                </div>

                {/* Card: Veículos */}
                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg shadow-black/10 group hover:border-zinc-700 transition-colors">
                    <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 group-hover:text-zinc-400 transition-colors">
                        Veículos no Pátio
                    </p>
                    <p className="text-4xl font-mono font-bold text-blue-400 mt-3 tracking-tight">
                        {veiculos.length.toString().padStart(2, '0')}
                    </p>
                </div>
            </div>
        </div>
    )
}