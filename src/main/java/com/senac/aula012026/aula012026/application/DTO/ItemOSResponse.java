package com.senac.aula012026.aula012026.application.DTO;

import com.senac.aula012026.aula012026.domain.entities.ItemOS;

import java.math.BigDecimal;

public record ItemOSResponse(
        String descricao,
        BigDecimal valor,
        int quantidade
) {
    public ItemOSResponse(ItemOS item){
        this(item.getDescricao(), item.getValor(), item.getQuantidade());
    }
}
