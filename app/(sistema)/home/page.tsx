'use client'
import { useAuth } from "@/app/context/AuthContext";
import { useMesa } from "@/app/context/MesaContext";
import { useEffect } from "react";

export default function Home(){
    const { usuario } = useAuth();
    const { mesas, carregarMesas } = useMesa();

    useEffect(() => {
        const restauranteId = usuario?.tipo === "RESTAURANTE" ? usuario?.id : usuario?.restauranteId;
        if(restauranteId){
            carregarMesas(restauranteId);
        }
    }, [usuario]);

    const mesasLivres = mesas.filter(m => m.status === "LIVRE").length;
    const mesasOcupadas = mesas.filter(m => m.status === "OCUPADA").length;

    return(
        <div className="space-y-6">
            <div className="rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-100 to-orange-100 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800">ChefOrder</p>
                <h1 className="mt-2 text-3xl font-bold text-amber-950">Painel Operacional</h1>
                <p className="mt-2 text-amber-900/80">
                    Bem-vindo, {usuario?.nome || 'Restaurante'}. Gerencie mesas e cadastros do seu ambiente em tempo real.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-green-200 bg-green-50 p-5">
                    <p className="text-sm text-green-700">Mesas livres</p>
                    <p className="text-3xl font-bold text-green-900 mt-2">{mesasLivres}</p>
                </div>
                <div className="rounded-xl border border-red-200 bg-red-50 p-5">
                    <p className="text-sm text-red-700">Mesas ocupadas</p>
                    <p className="text-3xl font-bold text-red-900 mt-2">{mesasOcupadas}</p>
                </div>
            </div>
        </div>
    )
}
