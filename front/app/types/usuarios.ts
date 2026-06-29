export interface Usuario {
    id: number | null;
    nome: string;
    email: string;
    senha?: string;
    status: string;
    role: string;
    oficinaId: number | null;
}

export interface UsuarioLogado {
    nome: string;
    role: string;
    oficinaId: number | null;
}

export interface UsuarioFormProps {
    usuarioExistente?: Usuario;
}

export interface AuthContextType {
    usuario: Usuario | null,
    token: string | null,
    login: (usuario: Usuario, token: string) => void,
    logout: () => void
}
