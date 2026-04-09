package com.senac.aula012026.aula012026.controllers;

import com.senac.aula012026.aula012026.model.entities.Usuario;
import com.senac.aula012026.aula012026.model.enuns.EnumStatusUsuario;
import com.senac.aula012026.aula012026.model.enuns.EnumTipoUsuario;
import com.senac.aula012026.aula012026.model.repository.UsuarioRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/usuarios")
@Tag(name = "Usuários controller",description = "Controladora responsável por gerenciar os usuários!")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;


    @GetMapping
    @Operation(summary = "Listar todos",description = "Método para listar todos os usuários!")
    public ResponseEntity<List<Usuario>> listarTodos(@RequestParam(required = false) Long restauranteId,
                                                     @RequestParam(required = false) Long usuarioLogadoId){

        if(restauranteId == null){
            var usuarios = usuarioRepository.findAll();
            return ResponseEntity.ok(usuarios);
        }

        var usuarios = new ArrayList<Usuario>(usuarioRepository.findByRestauranteId(restauranteId));
        if(usuarioLogadoId != null){
            var usuarioLogado = usuarioRepository.findById(usuarioLogadoId).orElse(null);
            if(usuarioLogado != null && usuarios.stream().noneMatch(u -> u.getId().equals(usuarioLogado.getId()))){
                usuarios.add(0, usuarioLogado);
            }
        }
        return ResponseEntity.ok(usuarios);
    }


    @GetMapping("/{id}")
    @Operation(summary = "Consulta de usuário por ID", description = "Método responsável por consultar um único usuário por ID e se não existir retorna null!")
    public ResponseEntity<Usuario> buscarPorId(@PathVariable Long id){
        return ResponseEntity.ok(usuarioRepository.findById(id).orElse(null));
    }

    @PostMapping
    @Operation(summary = "Criar usuário",description = "Método responsável por criar usuário")
    public ResponseEntity<Long> salvar (@RequestBody Usuario usuario){
        usuario.setTipo(EnumTipoUsuario.FUNCIONARIO);
        usuario.setRestauranteId(usuario.getRestauranteId());
        if(usuario.getStatus() == null){
            usuario.setStatus(EnumStatusUsuario.ATIVO);
        }

        return ResponseEntity.ok(usuarioRepository.save(usuario).getId());
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar usuário",description = "Método responsável por atualizar usuário")
    public ResponseEntity<?> alterarUsuario (@PathVariable Long id, @RequestBody Usuario usuario){

        var usuarioBanco = usuarioRepository.findById(id).orElse(null);

        if (usuarioBanco != null){
            usuarioBanco.setEmail(usuario.getEmail());
            usuarioBanco.setNome(usuario.getNome());
            usuarioBanco.setSenha(usuario.getSenha());
            usuarioBanco.setStatus(usuario.getStatus());
            if(usuarioBanco.getTipo() == EnumTipoUsuario.RESTAURANTE){
                usuarioBanco.setTipo(EnumTipoUsuario.RESTAURANTE);
                usuarioBanco.setRestauranteId(usuarioBanco.getId());
            }else{
                usuarioBanco.setTipo(EnumTipoUsuario.FUNCIONARIO);
                usuarioBanco.setRestauranteId(usuario.getRestauranteId());
            }

            usuarioRepository.save(usuarioBanco);

            return ResponseEntity.ok("Atualizado com sucesso!");
        }


        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}/status")
    @Operation(summary = "Alterar status",description = "Método responsável por ativar e inativar funcionário")
    public ResponseEntity<?> alterarStatus (@PathVariable Long id){
        var usuarioBanco = usuarioRepository.findById(id).orElse(null);

        if (usuarioBanco == null){
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

}
