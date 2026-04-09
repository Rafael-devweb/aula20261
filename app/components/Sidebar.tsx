'use client'
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
    const { usuario } = useAuth();

    return (
        <aside className="sticky top-0 h-screen w-64 bg-amber-950 text-amber-50 flex flex-col border-r border-amber-900 shrink-0">
            <div className="p-6 text-2xl font-bold border-b border-amber-900">
                ChefOrder<span className="text-amber-400">.</span>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                <Link
                    href="/home"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-amber-900 transition-colors duration-200 text-amber-200 hover:text-white group"
                >
                    <span className="font-medium">Painel</span>
                </Link>

                {usuario?.tipo === "RESTAURANTE" && (
                    <Link
                        href="/usuarios"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-amber-900 transition-colors duration-200 text-amber-200 hover:text-white group"
                    >
                        <span className="font-medium">Funcionários</span>
                    </Link>
                )}

                <Link
                    href="/clientes"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-amber-900 transition-colors duration-200 text-amber-200 hover:text-white group"
                >
                    <span className="font-medium">Mesas</span>
                </Link>
            </nav>
        </aside>
    );
}
