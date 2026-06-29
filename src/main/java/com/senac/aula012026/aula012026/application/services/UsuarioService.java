package com.senac.aula012026.aula012026.application.services;

import com.senac.aula012026.aula012026.application.DTO.*;
import com.senac.aula012026.aula012026.domain.entities.Usuario;
import com.senac.aula012026.aula012026.domain.enuns.EnumStatusUsuario;
import com.senac.aula012026.aula012026.domain.repository.OficinaRepository;
import com.senac.aula012026.aula012026.domain.repository.UsuarioRepository;
import com.senac.aula012026.aula012026.infra.ex.RegraNegocioException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private OficinaRepository oficinaRepository;

    public UsuarioResponse SalvarUsuario(UsuarioRequest request) {
        var oficinaId = buscarOficinaId();
        if(oficinaId == null){
            throw new RegraNegocioException("Um usuario deve pertencer a uma oficina");
        }
        var oficina = oficinaRepository.getReferenceById(oficinaId);
        var usuarioSalvar = new Usuario(request, oficina);

        return new UsuarioResponse(usuarioRepository.save(usuarioSalvar));
    }

    public void SalvarUsuarioAdmin(UsuarioAdminRequest request) {
        try{
            usuarioRepository.save(new Usuario(request));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    public boolean ValidaUsuarioSenha(LoginRequest loginRequest) {
        try {

            return usuarioRepository.existsUsuarioByEmailAndSenha(loginRequest.email(), loginRequest.senha());

        } catch (Exception e) {
            throw new RuntimeException(e);

        }
    }

    public boolean AlterarUsuario(Long id, Usuario usuario) {
        var oficinaId = buscarOficinaId();
        if(oficinaId == null){
            throw new RegraNegocioException("Um usuario deve pertencer a uma oficina");
        }
        var usuarioBanco = usuarioRepository.findByIdAndOficinaId(id, oficinaId).orElse(null);

        if (usuarioBanco != null) {

            usuarioBanco.setEmail(usuario.getEmail());
            usuarioBanco.setNome(usuario.getNome());
            usuarioBanco.setSenha(usuario.getSenha());
            usuarioBanco.setStatus(usuario.getStatus());

            usuarioRepository.save(usuarioBanco);

            return true;
        }
        return false;
    }

    public boolean AlterarStatusUsuario(Long id){
        var oficinaId = buscarOficinaId();
        var usuario = usuarioRepository.findByIdAndOficinaId(id, oficinaId).orElse(null);
        if(usuario != null) {
            usuario.setStatus(usuario.getStatus() == EnumStatusUsuario.ATIVO ? EnumStatusUsuario.INATIVO : EnumStatusUsuario.ATIVO);
            usuarioRepository.save(usuario);
            return true;
        }
        return false;
    }

    public List<UsuarioResponse> ListarTodos() {
        var oficinaId = buscarOficinaId();
        if (oficinaId == null) {
            throw new RegraNegocioException("Não foi possível identificar a oficina do usuário");
        }
        return usuarioRepository.findAllByOficinaId(oficinaId)
                .stream()
                .map(UsuarioResponse::new)
                .collect(Collectors.toList());
    }


    public UsuarioLogadoResponse BuscarUsuarioLogado() {

        try{
            var usuario = (UsuarioLogado) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if(usuario == null){
                throw new RegraNegocioException("Sem usuario logado");
            }
            var retornoBanco = usuarioRepository.findById(usuario.id()).orElseThrow(()-> new IllegalArgumentException("Nenhum usuario com esse id"));
            return new UsuarioLogadoResponse(retornoBanco);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }


    public UsuarioResponse BuscarUsuarioPorId(Long id) {
        try {
            var oficinaId = buscarOficinaId();
            var usuario = usuarioRepository.findByIdAndOficinaId(id, oficinaId).orElse(null);
            if(usuario == null){
                throw new RegraNegocioException("Não existe usuario com esse id para esta oficina");
            }
            return new UsuarioResponse(usuario);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public Long buscarOficinaId(){
        var auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || auth.getPrincipal() == null || !(auth.getPrincipal() instanceof UsuarioLogado)) {
            return null;
        }
        var usuario = (UsuarioLogado) auth.getPrincipal();
        
        var usuarioBanco = usuarioRepository.findById(usuario.id()).orElse(null);
        if(usuarioBanco != null && usuarioBanco.getOficina() != null){
            return usuarioBanco.getOficina().getId();
        }

        return null;
    }
}



