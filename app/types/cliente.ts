// No seu arquivo de types do cliente, certifique-se de que está assim:
export class Cliente {
    constructor(
        public id: number | null = null,
        public nome: string = '',
        public cpfCnpj: string = '',
        public telefone: string = '',
        public email: string = '',
        public endereco: string = '',
        public oficinaId: number | null = null
    ) { }
}

// Criado na mesma linha de raciocínio do "UsuarioFormProps" do professor
export interface ClienteFormProps {
    clienteExistente?: Cliente
}