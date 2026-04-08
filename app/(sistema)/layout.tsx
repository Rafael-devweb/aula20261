'use client'
import { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";

export default function SistemaLayout({ children }:
  { children: React.ReactNode }) {

  const { usuario } = useAuth();
  const router = useRouter();

  useEffect(() => {
    debugger;
    if (usuario == null) {

      router.push("/login")
    }
  })

  if (usuario == null) return null;

  return (
    <div className="flex min-h-screen">
      {/* A Sidebar agora vive dentro do fluxo do flex */}
      <Sidebar />

      {/* Ocupa o restante do espaço horizontal e empilha V verticalmente */}
      <div className="flex flex-col flex-1 min-w-0">
        <Header />

        <main className="flex-1 p-4 md:p-8 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}