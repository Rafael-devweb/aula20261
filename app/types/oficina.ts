
export interface OficinaFormProps {
    veiculoExistente?: OficinaFormProps
}
export class Oficina {
    
    constructor(
        public id: number | null,
        public nome: string,
        public email: string,
        public status: string,
        public tipo: string = "MATRIZ", // Ajustado o padrão para algo que faça sentido para Oficina
        public oficinaId: number | null = null
    ) { }
}

export interface AuthContextType {
    oficina: Oficina | null,
    token: string | null,
    login: (oficina: Oficina, token: string) => void,
    logout: () => void
}