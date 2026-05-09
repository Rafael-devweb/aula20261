import { Usuario } from "./usuarios";

export interface LoginResponse{
    token: string,
    id: number,
    nome: string,
    email: string,
    status: string,
    tipo: string,
    oficinaId: number | null
}
 export interface AuthState{
    usuario: Usuario | null;
    token: String

 }