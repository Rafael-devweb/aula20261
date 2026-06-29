'use client'
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, UserCog, Car, ClipboardList, Building2, ChevronLeft } from "lucide-react";

export default function Sidebar() {
    const usuario = useSelector((state: RootState) => state.auth.usuario);
    const pathname = usePathname();

    const isAdminRoute = pathname.startsWith('/admin');

    const MenuItem = ({ href, icon: Icon, children }: { href: string, icon: any, children: React.ReactNode }) => {
        const isActive = pathname === href;
        return (
            <Link
                href={href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 group ${
                    isActive 
                        ? "bg-zinc-800 text-white" 
                        : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
                }`}
            >
                <Icon size={20} className={isActive ? "text-white" : "text-zinc-400 group-hover:text-white"} />
                <span className="font-medium">{children}</span>
            </Link>
        );
    };

    return (
        <aside className="sticky top-0 h-screen w-64 bg-zinc-900 text-zinc-100 flex flex-col border-r border-zinc-700 shrink-0">
            <div className="p-6 text-2xl font-bold border-b border-zinc-700 flex items-center justify-between">
                <span>AutoFix<span className="text-slate-300">.</span></span>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {isAdminRoute ? (
                    <>
                        <div className="pt-2 pb-2 px-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                            Menu Administrativo
                        </div>
                        <MenuItem href="/admin" icon={LayoutDashboard}>Dashboard Admin</MenuItem>
                        <MenuItem href="/admin/oficinas" icon={Building2}>Gerenciar Oficinas</MenuItem>
                        
                        <div className="pt-8 mt-auto">
                            <Link
                                href="/home"
                                className="flex items-center gap-3 px-4 py-3 rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors duration-200"
                            >
                                <ChevronLeft size={20} />
                                <span className="font-medium">Voltar ao Sistema</span>
                            </Link>
                        </div>
                    </>
                ) : (
                    <>
                        {usuario?.role === "ADMINISTRADOR" && (
                            <>
                                <div className="pt-2 pb-2 px-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider text-amber-500/80">
                                    Acesso Master
                                </div>
                                <MenuItem href="/admin" icon={UserCog}>Painel Admin</MenuItem>
                                <div className="my-4 border-t border-zinc-800" />
                            </>
                        )}

                        <div className="pt-2 pb-2 px-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                            Gestão Oficina
                        </div>
                        <MenuItem href="/home" icon={LayoutDashboard}>Resumo</MenuItem>
                        <MenuItem href="/os" icon={ClipboardList}>Ordens de Serviço</MenuItem>
                        
                        {(usuario?.role === "OFICINA" || usuario?.role === "ADMINISTRADOR") && (
                            <MenuItem href="/usuarios" icon={Users}>Funcionários</MenuItem>
                        )}
                        
                        <MenuItem href="/clientes" icon={Users}>Clientes</MenuItem>
                        <MenuItem href="/veiculos" icon={Car}>Veículos</MenuItem>
                    </>
                )}
            </nav>
        </aside>
    );
}
