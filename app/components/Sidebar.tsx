'use client'
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
    const { usuario } = useAuth();

    return (
        <aside className="sticky top-0 h-screen w-64 bg-zinc-900 text-zinc-100 flex flex-col border-r border-zinc-700 shrink-0">
            <div className="p-6 text-2xl font-bold border-b border-zinc-700">
                AutoFix<span className="text-slate-300">.</span>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                <Link
                    href="/home"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-zinc-800 transition-colors duration-200 text-zinc-300 hover:text-white group"
                >
                    <span className="font-medium">Painel</span>
                </Link>

                {usuario?.tipo === "OFICINA" && (
                    <Link
                        href="/usuarios"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-zinc-800 transition-colors duration-200 text-zinc-300 hover:text-white group"
                    >
                        <span className="font-medium">Funcionários</span>
                    </Link>
                )}

                <Link
                    href="/clientes"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-zinc-800 transition-colors duration-200 text-zinc-300 hover:text-white group"
                >
                    <span className="font-medium">Clientes</span>
                </Link>

                <Link
                    href="/veiculos"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-zinc-800 transition-colors duration-200 text-zinc-300 hover:text-white group"
                >
                    <span className="font-medium">Veículos</span>
                </Link>
            </nav>
        </aside>
    );
}
