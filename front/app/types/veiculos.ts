export interface Veiculo {
    id: number | null;
    placa: string;
    marca: string;
    modelo: string;
    ano: string;
    clienteId: number | null;
    marcaId?: number;
    modeloId?: number;
}

export interface Marca {
    id: number;
    nome: string;
}

export interface Modelo {
    id: number;
    nome: string;
}

export interface VeiculoFormProps {
    veiculoExistente?: Veiculo;
}