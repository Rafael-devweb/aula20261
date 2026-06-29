
export interface UsuarioOficinaRequest {
    email: string;
    senha: string;
}

export interface OficinaRequest {
    razaoSocial: string;
    nomeFantasia: string;
    cnpj: string;
    usuario: UsuarioOficinaRequest;
}

export interface Oficina {
    id: number;
    razaoSocial: string;
    nomeFantasia: string;
    cnpj: string;
    status: string;
}

export interface DashboardStats {
    totalOficinas: number;
    totalUsuarios: number;
    totalClientes: number;
    totalVeiculos: number;
    totalOS: number;
}