package com.senac.aula012026.aula012026.application.DTO;

import java.math.BigDecimal;

public record ItemOSRequest(
        String descricao,
        BigDecimal valor,
        int quantidade
) {
}
