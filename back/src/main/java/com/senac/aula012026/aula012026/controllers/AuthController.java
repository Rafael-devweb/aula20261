package com.senac.aula012026.aula012026.controllers;


import com.senac.aula012026.aula012026.model.DTO.CadastroRequest;
import com.senac.aula012026.aula012026.model.DTO.LoginRequest;
import com.senac.aula012026.aula012026.model.DTO.LoginResponse;
import com.senac.aula012026.aula012026.model.entities.Usuario;
import com.senac.aula012026.aula012026.model.enuns.EnumStatusUsuario;
import com.senac.aula012026.aula012026.model.enuns.EnumTipoUsuario;
import com.senac.aula012026.aula012026.model.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest){
        var usuario = usuarioRepository
                .findByEmailAndSenha(loginRequest.email(), loginRequest.senha())
                .orElse(null);

        if(usuario == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        var statusUsuario = usuario.getStatus() != null ? usuario.getStatus().name() : EnumStatusUsuario.ATIVO.name();
        var tipoUsuario = usuario.getTipo() != null ? usuario.getTipo().name() : EnumTipoUsuario.FUNCIONARIO.name();
        var restauranteId = usuario.getTipo() == EnumTipoUsuario.RESTAURANTE ? usuario.getId() : usuario.getRestauranteId();

        return ResponseEntity.ok(
                new LoginResponse(
                        "Sasdasdas123",
                        usuario.getId(),
                        usuario.getNome(),
                        usuario.getEmail(),
                        statusUsuario,
                        tipoUsuario,
                        restauranteId
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
        usuario.setTipo(EnumTipoUsuario.RESTAURANTE);

        var usuarioNovo = usuarioRepository.save(usuario);
        usuarioNovo.setRestauranteId(usuarioNovo.getId());
        usuarioRepository.save(usuarioNovo);

        return ResponseEntity.ok(usuarioNovo.getId());
    }

}
