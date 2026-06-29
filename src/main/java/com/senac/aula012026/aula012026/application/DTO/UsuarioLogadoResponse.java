package com.senac.aula012026.aula012026.application.DTO;

import com.senac.aula012026.aula012026.domain.entities.Usuario;

public record UsuarioLogadoResponse(
        String nome,
        String role,
        Long oficinaId
) {
    public UsuarioLogadoResponse(Usuario usuario){
        this(usuario.getNome(), usuario.getRole().toString(), usuario.getOficina() != null ? usuario.getOficina().getId() : null);
    }
}
