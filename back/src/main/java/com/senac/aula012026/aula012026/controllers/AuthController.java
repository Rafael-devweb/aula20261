package com.senac.aula012026.aula012026.controllers;

import com.senac.aula012026.aula012026.model.DTO.CadastroRequest;
import com.senac.aula012026.aula012026.model.DTO.LoginRequest;
import com.senac.aula012026.aula012026.model.DTO.LoginResponse;
import com.senac.aula012026.aula012026.model.entities.Usuario;
import com.senac.aula012026.aula012026.model.enuns.EnumStatusUsuario;
import com.senac.aula012026.aula012026.model.enuns.EnumTipoUsuario;
import com.senac.aula012026.aula012026.model.repository.UsuarioRepository;
import com.senac.aula012026.aula012026.services.TokenService;
import com.senac.aula012026.aula012026.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest){
        var usuario = usuarioRepository
                .findByEmailAndSenha(loginRequest.email(), loginRequest.senha())
                .orElse(null);

        if(usuarioService.ValidaUsuarioSenha(loginRequest)){


            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        }

        var token = tokenService.gerarToken(loginRequest.email());
        var statusUsuario = usuario.getStatus() != null ? usuario.getStatus().name() : EnumStatusUsuario.ATIVO.name();
        var tipoUsuario = usuario.getTipo() != null ? usuario.getTipo().name() : EnumTipoUsuario.FUNCIONARIO.name();
        var oficinaId = usuario.getTipo() == EnumTipoUsuario.OFICINA ? usuario.getId() : usuario.getOficinaId();

        return ResponseEntity.ok(
                new LoginResponse(
                        token,
                        usuario.getId(),
                        usuario.getNome(),
                        usuario.getEmail(),
                        statusUsuario,
                        tipoUsuario,
                        oficinaId
                )
        );
    }

    @PostMapping("/cadastro")
    public ResponseEntity<?> cadastro(@RequestBody CadastroRequest cadastroRequest){
        var usuarioExistente = usuarioRepository.findByEmail(cadastroRequest.email()).orElse(null);
        if(usuarioExistente != null){
            return ResponseEntity.badRequest().body("E-mail já cadastrado!");

        }

        var usuario = new Usuario();
        usuario.setNome(cadastroRequest.nome());
        usuario.setEmail(cadastroRequest.email());
        usuario.setSenha(cadastroRequest.senha());
        usuario.setStatus(EnumStatusUsuario.ATIVO);
        usuario.setTipo(EnumTipoUsuario.OFICINA);

        var usuarioNovo = usuarioRepository.save(usuario);
        usuarioNovo.setOficinaId(usuarioNovo.getId());
        usuarioRepository.save(usuarioNovo);

        return ResponseEntity.ok(usuarioNovo.getId());
    }



}