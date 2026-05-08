package com.senac.aula012026.aula012026.presentation.controllers;


import com.senac.aula012026.aula012026.application.DTO.UsuarioResponse;
import com.senac.aula012026.aula012026.application.services.UsuarioService;
import com.senac.aula012026.aula012026.domain.entities.Usuario;
import com.senac.aula012026.aula012026.domain.enuns.EnumStatusUsuario;
import com.senac.aula012026.aula012026.domain.enuns.EnumTipoUsuario;
import com.senac.aula012026.aula012026.domain.repository.UsuarioRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/usuarios")
@Tag(name = "Usuários controller",description = "Controladora responsável por gerenciar os usuários!")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;


    @Autowired
    private UsuarioRepository usuarioRepository;


    @GetMapping
    @Operation(summary = "Listar todos",description = "Método para listar todos os usuários!")
    public ResponseEntity<List<UsuarioResponse>> listarTodos(){

        var usuarios = usuarioService.ListarTodos();

        return ResponseEntity.ok(usuarios);
    }



    @GetMapping("/{id}")
    @Operation(summary = "Consulta de usuario por ID", description = "Médoto responsavel por consultar um unico usuario por ID e se não existir retorna null!")
    public ResponseEntity<UsuarioResponse> buscarPorId(@PathVariable Long id){
        return ResponseEntity.ok(usuarioService.BuscarUsuarioPorId(id));
        }



    @PostMapping
    @Operation(summary = "Criar usuário",description = "Método responsável por criar usuário")
    public ResponseEntity<Long> salvar (@RequestBody Usuario usuario){
        usuario.setTipoUsuario(EnumTipoUsuario.FUNCIONARIO);
        usuario.setOficinaId(usuario.getOficinaId());
        if(usuario.getStatus() == null){
            usuario.setStatus(EnumStatusUsuario.ATIVO);
        }

        return ResponseEntity.ok(usuarioRepository.save(usuario).getId());
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar usuário",description = "Método responsável por atualizar usuário")
    public ResponseEntity<?> alterarUsuario (@PathVariable Long id, @RequestParam Long oficinaId, @RequestBody Usuario usuario) {

        var alterarUsuarioResult = usuarioService.AlterarUsuario(id, usuario, oficinaId);

        return alterarUsuarioResult ? ResponseEntity.ok("Atulizado com sucesso") : ResponseEntity.notFound().build();

    }

    @PutMapping("/{id}/status")
    @Operation(summary = "Alterar status",description = "Método responsável por ativar e inativar funcionário")
    public ResponseEntity<?> alterarStatus (@PathVariable Long id, @RequestParam Long oficinaId){
        var usuarioBanco = usuarioRepository.findById(id).orElse(null);

        if (usuarioBanco == null){
            return ResponseEntity.notFound().build();
        }

        if(!oficinaId.equals(usuarioBanco.getOficinaId())){
            return ResponseEntity.notFound().build();
        }

        if(usuarioBanco.getStatus() == EnumStatusUsuario.INATIVO){
            usuarioBanco.setStatus(EnumStatusUsuario.ATIVO);
        }else{
            usuarioBanco.setStatus(EnumStatusUsuario.INATIVO);
        }

        usuarioRepository.save(usuarioBanco);
        return ResponseEntity.ok(usuarioBanco);
    }

    @GetMapping("/usuariologado")
    @Operation(summary = "Consulta usuario logado",description = "busca usuario da sessãoo")
    public ResponseEntity<Usuario> buscarUsarioLogado(Authentication authentication){
        Usuario usuario = (Usuario) authentication.getPrincipal();
        return ResponseEntity.ok(usuarioService.BuscarUsuarioLogado(usuario));
    }
}

