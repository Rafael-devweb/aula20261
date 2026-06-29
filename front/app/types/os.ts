import { Veiculo } from "./veiculos";

export interface EnumStatusOS {
   status: string
}

export interface ItemOSRequest {
    descricao: string;
    valor: number;
    quantidade: number;
}



export interface OrdemServicoRequest {
    veiculoId: number;
    descricao: string;
    itens: ItemOSRequest[];
}

export interface OrdemServicoResponse {
    id: number;
    veiculo: Veiculo;
    cliente: string;
    descricao: string;
    status: string;
    valorTotal: number;
    itens: ItemOSResponse[];
}

export interface ItemOSResponse {
    id: number;
    descricao: string;
    valor: number;
    quantidade: number;
}
