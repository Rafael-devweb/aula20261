'use client';

import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col w-full -mt-8 bg-gradient-to-b from-amber-50 via-orange-50 to-white">
      <section className="relative min-h-[82vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-amber-300/30 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-orange-300/30 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <span className="inline-block py-1 px-3 mb-6 text-xs font-bold tracking-widest text-amber-900 uppercase bg-amber-100 rounded-full">
            Plataforma de Comandas 2026
          </span>
          <h1 className="text-5xl md:text-8xl font-black text-amber-950 tracking-tighter mb-8">
            CHEFORDER<span className="text-orange-500">.</span>
          </h1>
          <p className="text-xl md:text-2xl text-amber-900/80 mb-10 leading-relaxed max-w-3xl mx-auto">
            Controle de restaurantes, mesas e pedidos em um único fluxo: rápido, claro e pronto para o serviço.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="px-10 py-4 bg-amber-900 text-white font-bold rounded-xl hover:bg-amber-800 transition-all transform hover:-translate-y-1 inline-block text-center"
            >
              Entrar no Painel
            </Link>
            <Link
              href="/cadastro"
              className="px-10 py-4 bg-white text-amber-900 border border-amber-200 font-bold rounded-xl hover:bg-amber-50 transition-all inline-block text-center"
            >
              Cadastre-se
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white/80 border-y border-amber-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="relative p-2 bg-white border border-amber-200 rounded-3xl shadow-2xl shadow-amber-100">
                <div className="aspect-square bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-24 h-24 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 7h16M6 7l1 11h10l1-11M9 11v4m6-4v4M9 4h6" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 space-y-6">
              <h2 className="text-4xl font-bold text-amber-950 tracking-tight">Nossa Proposta</h2>
              <p className="text-lg text-amber-900/80 leading-relaxed">
                O ChefOrder nasceu para simplificar a rotina do restaurante: cadastro de cardápio, controle de mesas e operação de pedidos em um único lugar.
              </p>
              <p className="text-lg text-amber-900/80 leading-relaxed">
                A mesma estrutura robusta do projeto base foi mantida, com interface orientada ao dia a dia de atendimento e fechamento de comandas.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-r from-amber-950 to-orange-900 text-white rounded-[3rem] mx-4 mb-12">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-16 text-center">Fluxo Operacional</h2>
          <div className="space-y-12">
            <div className="relative pl-8 border-l border-amber-400/40">
              <div className="absolute -left-[5px] top-0 w-2 h-2 bg-amber-200 rounded-full"></div>
              <span className="text-sm text-amber-200 font-mono">PASSO 1</span>
              <h4 className="text-xl font-bold mt-2 italic">Autenticação do Restaurante</h4>
              <p className="text-amber-100 mt-2">Acesso seguro para operar mesas e cardápio dentro do seu próprio ambiente.</p>
            </div>
            <div className="relative pl-8 border-l border-amber-400/40">
              <div className="absolute -left-[5px] top-0 w-2 h-2 bg-amber-200 rounded-full"></div>
              <span className="text-sm text-amber-200 font-mono">PASSO 2</span>
              <h4 className="text-xl font-bold mt-2 italic">Gestão de Mesas e Itens</h4>
              <p className="text-amber-100 mt-2">Visualização das mesas e registro rápido dos itens para cada atendimento.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
