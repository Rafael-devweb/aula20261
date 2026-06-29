import { UsuarioLogado } from "./usuarios";

export interface LoginResponse{
    token: string,
    usuario: UsuarioLogado
}
 export interface AuthState{
    usuario: UsuarioLogado | null;
    token: string
 }

 export interface LoginRequest {
    email: string;
    senha: string;
 }

 export interface TokenResponse {
    token: string
 }