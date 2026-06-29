package com.senac.aula012026.aula012026.application.DTO;

import com.senac.aula012026.aula012026.domain.entities.Usuario;
import com.senac.aula012026.aula012026.domain.enuns.EnumTipoUsuario;

public record UsuarioLogado(
        Long id,
        String nome,
        String email,
        Long oficinaId
) {
    public UsuarioLogado(Usuario usuario){
        this(usuario.getId(),usuario.getNome(),usuario.getEmail(), usuario.getOficina() != null ? usuario.getOficina().getId() : null);
    }
}
