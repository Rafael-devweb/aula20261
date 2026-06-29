package com.senac.aula012026.aula012026.application.DTO;

import com.senac.aula012026.aula012026.domain.entities.Marca;

public record MarcaResponse(Long id, String nome) {
    public MarcaResponse(Marca marca) {
        this(marca.getId(), marca.getNome());
    }
}
