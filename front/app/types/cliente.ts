export interface Cliente {
    id: number | null;
    nome: string;
    cpf: string;
    telefone: string;
    oficinaId: number | null;
    status?: string;
}

export interface ClienteFormProps {
    clienteExistente?: Cliente
}