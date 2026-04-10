'use client';

import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col w-full -mt-8 bg-gradient-to-b from-zinc-800 via-slate-800 to-zinc-900">
      <section className="relative min-h-[82vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-slate-500/20 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-zinc-500/20 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <span className="inline-block py-1 px-3 mb-6 text-xs font-bold tracking-widest text-zinc-200 uppercase bg-zinc-700 rounded-full">
            Plataforma de Gestão de Oficinas 2026
          </span>
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-8">
            AUTOFIX<span className="text-slate-400">.</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-200 mb-10 leading-relaxed max-w-3xl mx-auto">
            Gestão de oficinas mecânicas com controle de clientes, veículos e equipe em um único fluxo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="px-10 py-4 bg-slate-400 text-zinc-900 font-bold rounded-xl hover:bg-slate-300 transition-all transform hover:-translate-y-1 inline-block text-center"
            >
              Entrar no Painel
            </Link>
            <Link
              href="/cadastro"
              className="px-10 py-4 bg-zinc-900 text-zinc-100 border border-zinc-600 font-bold rounded-xl hover:bg-zinc-800 transition-all inline-block text-center"
            >
              Cadastre-se
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-zinc-100/95 border-y border-zinc-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="relative p-2 bg-white border border-zinc-300 rounded-3xl shadow-2xl shadow-zinc-400/20">
                <div className="aspect-square bg-gradient-to-br from-zinc-200 to-slate-200 rounded-2xl flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-24 h-24 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l2-6h12l2 6M7 16h10M6 10l2-3h8l2 3M9 6V4m6 2V4" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 space-y-6">
              <h2 className="text-4xl font-bold text-zinc-900 tracking-tight">Nossa Proposta</h2>
              <p className="text-lg text-zinc-700 leading-relaxed">
                O AutoFix foi criado para simplificar a rotina da oficina: cadastro de clientes, controle de veículos e organização da equipe.
              </p>
              <p className="text-lg text-zinc-700 leading-relaxed">
                A base técnica permanece robusta, com uma interface direta para acelerar atendimento e operação no dia a dia.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-r from-zinc-900 to-slate-900 text-white rounded-[3rem] mx-4 mb-12">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-16 text-center">Fluxo Operacional</h2>
          <div className="space-y-12">
            <div className="relative pl-8 border-l border-zinc-500/50">
              <div className="absolute -left-[5px] top-0 w-2 h-2 bg-slate-300 rounded-full"></div>
              <span className="text-sm text-zinc-300 font-mono">PASSO 1</span>
              <h4 className="text-xl font-bold mt-2 italic">Autenticação da Oficina</h4>
              <p className="text-zinc-300 mt-2">Acesso seguro para gerenciar clientes, veículos e funcionários da sua própria oficina.</p>
            </div>
            <div className="relative pl-8 border-l border-zinc-500/50">
              <div className="absolute -left-[5px] top-0 w-2 h-2 bg-slate-300 rounded-full"></div>
              <span className="text-sm text-zinc-300 font-mono">PASSO 2</span>
              <h4 className="text-xl font-bold mt-2 italic">Gestão de Veículos e Atendimento</h4>
              <p className="text-zinc-300 mt-2">Cadastro rápido de clientes e veículos para manter a operação organizada e sem retrabalho.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}