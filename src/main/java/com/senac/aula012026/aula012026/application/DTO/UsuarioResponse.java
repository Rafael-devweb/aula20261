package com.senac.aula012026.aula012026.application.DTO;


import com.senac.aula012026.aula012026.domain.entities.Usuario;
import com.senac.aula012026.aula012026.domain.enuns.EnumStatusUsuario;
import com.senac.aula012026.aula012026.domain.enuns.EnumTipoUsuario;

public record UsuarioResponse(
        Long id,
        String nome,
        String email,
        EnumStatusUsuario status,
        EnumTipoUsuario role
) {

    public UsuarioResponse(Usuario usuario) {

        this(
                usuario.getId(),
                usuario.getNome(),
                usuario.getEmail(),
                usuario.getStatus(),
                usuario.getRole()
        );

    }

}


