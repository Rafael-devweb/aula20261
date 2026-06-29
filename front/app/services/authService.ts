import axios from "axios";
import { LoginRequest, LoginResponse, TokenResponse } from "../types/auth";
import { UsuarioLogado } from "../types/usuarios";
import api from "./api";

export async function loginService(login: LoginRequest): Promise<LoginResponse> {

        const loginResult = await axios.post<LoginResponse>('http://localhost:8080/auth/login', login);
        if(loginResult.status === 200){
                return loginResult.data;
        }
        throw new Error("Erro ao logar!")

}


