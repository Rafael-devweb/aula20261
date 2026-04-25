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
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/auth")
@Tag(description = "Serviço responsavel por controlar a autenticação de usuarios e sessão!",name = "Serviço autenticação")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;


    @Autowired
    private TokenService tokenService;

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/login")
    @Operation(description = "Valida senha asdhaukshd 50 carecteres, calcula longitudo com latitud!",summary = "Login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest){


        if(usuarioService.ValidaUsuarioSenha(loginRequest)){

            var token = tokenService.gerarToken(loginRequest.email());

            return ResponseEntity.ok(new LoginResponse(token));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }


}