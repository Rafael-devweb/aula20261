package com.senac.aula012026.aula012026.services;

import com.senac.aula012026.aula012026.model.DTO.LoginRequest;
import com.senac.aula012026.aula012026.model.entities.Usuario;
import com.senac.aula012026.aula012026.model.enuns.EnumTipoUsuario;
import com.senac.aula012026.aula012026.model.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;


    public boolean ValidaUsuarioSenha(LoginRequest loginRequest){
        try{


            return usuarioRepository.existUsuarioByEmailContainingSenha(loginRequest.email(), loginRequest.senha());

        }catch(Exception e){
            throw new RuntimeException(e);

        }
    }

    public boolean AlterarUsuario(Long id, Usuario usuario, Long oficinaId) {
        var usuarioBanco = usuarioRepository.findById(id).orElse(null);

        if (usuarioBanco != null){

            usuarioBanco.setEmail(usuario.getEmail());
            usuarioBanco.setNome(usuario.getNome());
            usuarioBanco.setSenha(usuario.getSenha());
            usuarioBanco.setStatus(usuario.getStatus());

            usuarioBanco.setTipo(usuarioBanco.getTipo() == EnumTipoUsuario.OFICINA ? EnumTipoUsuario.OFICINA : EnumTipoUsuario.FUNCIONARIO);

            usuarioRepository.save(usuarioBanco);

            return true;
        }
        return false;
    }
}
