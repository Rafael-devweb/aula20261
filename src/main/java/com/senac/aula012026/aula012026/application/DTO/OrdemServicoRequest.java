package com.senac.aula012026.aula012026.application.DTO;

import java.util.List;

public record OrdemServicoRequest(
        Long veiculoId,
        String descricao,
        List<ItemOSRequest> itens
) {
}
