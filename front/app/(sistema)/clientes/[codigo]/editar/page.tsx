'use client'

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import ClienteForm from "../../componentes/ClienteForm";

import { Cliente } from "@/app/types/cliente";
import { buscarClientePorId } from "@/app/services/clienteService";

export default function EditarCliente() {

    const params = useParams();

    const router = useRouter();

    const number = Number(params.nuember);

    const [cliente, setCliente] = useState<Cliente | null>(null);

    useEffect(() => {

        buscarDados();

    }, []);

    const buscarDados = async () => {

        const client = await buscarClientePorId(number);

        if (client) {

            setCliente(cliente);

        } else {

            router.push("/clientes");

        }

    }

    if (!cliente) {

        return (
            <div className="p-8">
                Carregando dados...
            </div>
        )

    }

    return (

        <div className="min-h-screen bg-slate-50 p-4 md:p-8">

            <div className="max-w-7xl mx-auto">

                <div className="flex flex-col gap-3 mb-8">

                    <Link
                        href="/clientes"
                        className="group flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
                    >

                        <span className="mr-2 transition-transform group-hover:-translate-x-1">
                            ←
                        </span>

                        Voltar para listagem

                    </Link>

                    <div className="space-y-1 border-l-4 border-blue-500 pl-4">

                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">

                            {number
                                ? `Editar Cliente #${number}`
                                : 'Cadastro de Novo Cliente'}

                        </h1>

                    </div>

                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10">

                    <ClienteForm clienteExistente={cliente} />

                </div>

            </div>

        </div>

    )

}