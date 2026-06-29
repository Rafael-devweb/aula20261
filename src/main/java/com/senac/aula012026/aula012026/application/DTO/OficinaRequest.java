package com.senac.aula012026.aula012026.application.DTO;

public record OficinaRequest(
        String razaoSocial,
        String nomeFantasia,
        String cnpj,
        UsuarioOficinaRequest usuario
) {
}
