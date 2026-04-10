export default function Footer(){
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full bg-zinc-900 border-t border-zinc-700">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-sm text-zinc-300">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="w-4 h-4 text-slate-300"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
            <p>
              &copy; {currentYear} <span className="font-semibold text-zinc-100">AutoFix</span>. 
              Todos os direitos reservados.
            </p>
          </div>

          <div className="flex items-center gap-8">
            <a 
              href="http://localhost:8080/swagger-ui/index.html"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-zinc-300 hover:text-zinc-100 transition-all duration-200"
            >
              Suporte
            </a>
            <a 
              href="#" 
              className="text-sm font-medium text-zinc-300 hover:text-zinc-100 transition-all duration-200"
            >
              Termos de uso
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}