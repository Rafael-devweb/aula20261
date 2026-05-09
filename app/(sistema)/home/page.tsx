'use client'

import { useCliente } from "@/app/context/ClienteContext";
import { useVeiculo } from "@/app/context/VeiculoContext";
import { store } from "@/app/redux/store";
import { useEffect } from "react";

export default function Home(){
    const { clientes, carregarClientes } = useCliente();
    const { veiculos, carregarVeiculos } = useVeiculo();

    const usuario = store.getState().auth.usuario;

    useEffect(() => {
        const oficinaId = usuario?.tipo === "OFICINA" ? usuario?.id : usuario?.oficinaId;
        if(oficinaId){
            carregarClientes(oficinaId);
            carregarVeiculos(oficinaId);
        }
    }, [usuario]);

    return(
        <div className="space-y-6">
            <div className="rounded-2xl border border-zinc-600 bg-gradient-to-r from-zinc-800 to-slate-800 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">AutoFix</p>
                <h1 className="mt-2 text-3xl font-bold text-white">Painel Operacional</h1>
                <p className="mt-2 text-zinc-300">
                    Bem-vindo, {usuario?.nome || 'Oficina'}. Gerencie clientes, veículos e equipe do seu ambiente em tempo real.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-zinc-300 bg-white p-5">
                    <p className="text-sm text-zinc-600">Clientes cadastrados</p>
                    <p className="text-3xl font-bold text-zinc-900 mt-2">{clientes.length}</p>
                </div>
                <div className="rounded-xl border border-zinc-300 bg-white p-5">
                    <p className="text-sm text-zinc-600">Veículos cadastrados</p>
                    <p className="text-3xl font-bold text-zinc-900 mt-2">{veiculos.length}</p>
                </div>
            </div>
        </div>
    )
}