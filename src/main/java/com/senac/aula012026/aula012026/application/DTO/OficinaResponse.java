package com.senac.aula012026.aula012026.application.DTO;

import com.senac.aula012026.aula012026.domain.entities.Oficina;

public record OficinaResponse(
        Long id,
        String razaoSocial,
        String nomeFantasia,
        String cnpj,
        String status
) {
    public OficinaResponse(Oficina oficina) {
        this(
                oficina.getId(),
                oficina.getRazaoSocial(),
                oficina.getNomeFantasia(),
                oficina.getCnpj() != null ? oficina.getCnpj().toString() : null,
                oficina.getStatus() != null ? oficina.getStatus().name() : null
        );
    }
}
