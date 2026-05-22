package com.senac.aula012026.aula012026.application.services;

import com.senac.aula012026.aula012026.application.DTO.LoginRequest;
import com.senac.aula012026.aula012026.application.DTO.UsuarioResponse;
import com.senac.aula012026.aula012026.domain.entities.Usuario;
import com.senac.aula012026.aula012026.domain.enuns.EnumTipoUsuario;
import com.senac.aula012026.aula012026.domain.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;


    public boolean ValidaUsuarioSenha(LoginRequest loginRequest) {
        try {

            return usuarioRepository.existsUsuarioByEmailAndSenha(loginRequest.email(), loginRequest.senha());

        } catch (Exception e) {
            throw new RuntimeException(e);

        }
    }

    public boolean AlterarUsuario(Long id, Usuario usuario, Long oficinaId) {
        var usuarioBanco = usuarioRepository.findById(id).orElse(null);

        if (usuarioBanco != null) {

            usuarioBanco.setEmail(usuario.getEmail());
            usuarioBanco.setNome(usuario.getNome());
            usuarioBanco.setSenha(usuario.getSenha());
            usuarioBanco.setStatus(usuario.getStatus());

            usuarioBanco.setTipoUsuario(usuarioBanco.getTipoUsuario() == EnumTipoUsuario.OFICINA ? EnumTipoUsuario.OFICINA : EnumTipoUsuario.FUNCIONARIO);

            usuarioRepository.save(usuarioBanco);

            return true;
        }
        return false;
    }

    public List<UsuarioResponse> ListarTodos() {
        try {
            return usuarioRepository.findAll()
                    .stream()
                    .map(UsuarioResponse::new)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    public Usuario BuscarUsuarioLogado(Usuario usuario) {

        try{
            return   usuarioRepository.findById(usuario.getId()).orElse(null);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    public UsuarioResponse BuscarUsuarioPorId(Long id) {
        try {
            var usuario = usuarioRepository.findById(id).orElse(null);
            return new UsuarioResponse(usuario);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }
}



