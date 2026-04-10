'use client'
import { useEffect } from "react";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default function SistemaLayout({ children }:
  { children: React.ReactNode }) {

  const { usuario } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (usuario == null) {
      router.push("/login")
      return;
    }

    if (usuario.tipo === "FUNCIONARIO" && pathname.startsWith("/usuarios")) {
      router.push("/home")
    }
  }, [usuario, pathname, router])

  if (usuario == null) return null;

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0">
        <Header />

        <main className="flex-1 p-4 md:p-8 bg-zinc-100">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
