package com.senac.aula012026.aula012026.application.DTO;

public record VeiculoRequest(
        String placa,
        String ano,
        Long modeloId,
        Long clienteId
) {
}
