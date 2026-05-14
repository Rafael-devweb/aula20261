// @/app/types/cliente.ts
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