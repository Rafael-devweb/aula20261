export interface LoginResponse{
    token: string,
    id: number,
    nome: string,
    email: string,
    status: string,
    tipo: string,
    oficinaId: number | null
}