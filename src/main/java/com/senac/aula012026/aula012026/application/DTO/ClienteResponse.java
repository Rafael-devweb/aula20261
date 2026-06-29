package com.senac.aula012026.aula012026.application.DTO;

import com.senac.aula012026.aula012026.domain.entities.Cliente;

public record ClienteResponse(
        Long id,
        String nome,
        String telefone,
        String cpf
) {
    public ClienteResponse(Cliente cliente) {
        this(
                cliente.getId(),
                cliente.getNome(),
                cliente.getTelefone(),
                cliente.getCpf().toString()
        );
    }
}
