package com.senac.aula012026.aula012026.application.DTO;

import com.senac.aula012026.aula012026.domain.entities.Veiculo;

public record VeiculoResponse(
        Long id,
        String placa,
        String ano,
        String marca,
        String modelo,
        Long marcaId,
        Long modeloId,
        Long clienteId
) {
    public VeiculoResponse(Veiculo veiculo){
        this(
            veiculo.getId(), 
            veiculo.getPlaca(), 
            veiculo.getAno(), 
            veiculo.getMarca().getNome(), 
            veiculo.getModelo().getNome(),
            veiculo.getMarca().getId(),
            veiculo.getModelo().getId(),
            veiculo.getCliente().getId()
        );
    }
}
