// @/app/types/veiculo.ts
export class Veiculo {
    constructor(
        public id: number | null = null,
        public placa: string = '',
        public marca: string = '',
        public modelo: string = '',
        public ano: string = '',
        public clienteId: number | null = null,
        public oficinaId: number | null = null
    ) { }
}