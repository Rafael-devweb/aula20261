package com.senac.aula012026.aula012026.application.DTO;

public record UsuarioAdminRequest(
        String nome,
        String email,
        String senha,
        String secretKey
) {
}
