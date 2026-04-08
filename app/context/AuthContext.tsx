'use client'
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export class Usuario {
    constructor(
        public id: number|null,
        public nome: string,
        public email: string,
        public status: string
    ) { }
}

interface AuthContextType {
    usuario: Usuario | null,
    token: string | null,
    login: (usuario: Usuario, token: string) => void,
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        debugger;
        const usuarioRecover = Cookies.get('usuario');
        const tokenRecover = Cookies.get('token');

        if (usuarioRecover && tokenRecover) {
            try {
                setUsuario(JSON.parse(usuarioRecover));
                setToken(tokenRecover);
                
                router.push(window.location.pathname)
            } catch (e) {
                console.error(e);
            }
        }

    }, []);

    const login = (usuario: Usuario, token: string) => {
        debugger;
        setUsuario(usuario);
        setToken(token);
        Cookies.set('usuario', JSON.stringify(usuario), { expires: 7 });
        Cookies.set('token', token, { expires: 7, secure: true })

    }

    const logout = () => {
        setUsuario(null);
        setToken(null);
        Cookies.remove('usuario');
        Cookies.remove('token');

    }

    return (
        <AuthContext.Provider value={{ usuario, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth deve ser usado dentro do provider!')
    return context;
}