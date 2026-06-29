package com.senac.aula012026.aula012026.presentation.controllers;


import com.senac.aula012026.aula012026.application.DTO.UsuarioAdminRequest;
import com.senac.aula012026.aula012026.application.DTO.UsuarioLogado;
import com.senac.aula012026.aula012026.application.DTO.UsuarioLogadoResponse;
import com.senac.aula012026.aula012026.application.DTO.UsuarioResponse;
import com.senac.aula012026.aula012026.application.services.UsuarioService;
import com.senac.aula012026.aula012026.domain.entities.Usuario;
import com.senac.aula012026.aula012026.domain.enuns.EnumStatusUsuario;
import com.senac.aula012026.aula012026.domain.repository.UsuarioRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
@Tag(name = "Usuários controller",description = "Controladora responsável por gerenciar os usuários!")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;



    @GetMapping
    @Operation(summary = "Listar todos",description = "Método para listar todos os usuários!")
    public ResponseEntity<List<UsuarioResponse>> listarTodos(){

        var usuarios = usuarioService.ListarTodos();

        return ResponseEntity.ok(usuarios);
    }

    @PostMapping("/adm")
    @Operation(summary = "Criar admin", description = "Cria usuario admin pelo desktop")
    public ResponseEntity<?> criarAdmin(@RequestBody UsuarioAdminRequest usuario){
        usuarioService.SalvarUsuarioAdmin(usuario);
        return ResponseEntity.ok().build();
    }



    @GetMapping("/{id}")
    @Operation(summary = "Consulta de usuario por ID", description = "Médoto responsavel por consultar um unico usuario por ID e se não existir retorna null!")
    public ResponseEntity<UsuarioResponse> buscarPorId(@PathVariable Long id){
        return ResponseEntity.ok(usuarioService.BuscarUsuarioPorId(id));
        }



    @PostMapping
    @Operation(summary = "Criar usuário",description = "Método responsável por criar usuário")
    public ResponseEntity<UsuarioResponse> salvar (@RequestBody com.senac.aula012026.aula012026.application.DTO.UsuarioRequest request){
        return ResponseEntity.ok(usuarioService.SalvarUsuario(request));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar usuário",description = "Método responsável por atualizar usuário")
    public ResponseEntity<?> alterarUsuario (@PathVariable Long id, @RequestBody Usuario usuario) {

        var alterarUsuarioResult = usuarioService.AlterarUsuario(id, usuario);

        return alterarUsuarioResult ? ResponseEntity.ok("Atulizado com sucesso") : ResponseEntity.notFound().build();

    }

    @PutMapping("/{id}/status")
    @Operation(summary = "Alterar status",description = "Método responsável por ativar e inativar funcionário")
    public ResponseEntity<?> alterarStatus (@PathVariable Long id){
        var result = usuarioService.AlterarStatusUsuario(id);
        return result ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    @GetMapping("/usuariologado")
    @Operation(summary = "Consulta usuario logado",description = "busca usuario da sessãoo")
    public ResponseEntity<UsuarioLogadoResponse> buscarUsarioLogado(){
        return ResponseEntity.ok(usuarioService.BuscarUsuarioLogado());
    }
}

