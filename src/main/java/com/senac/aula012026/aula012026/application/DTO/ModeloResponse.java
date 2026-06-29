package com.senac.aula012026.aula012026.application.DTO;

import com.senac.aula012026.aula012026.domain.entities.Modelo;

public record ModeloResponse(Long id, String nome) {
    public ModeloResponse(Modelo modelo) {
        this(modelo.getId(), modelo.getNome());
    }
}
