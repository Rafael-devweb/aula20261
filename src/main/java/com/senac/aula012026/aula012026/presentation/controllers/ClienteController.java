package com.senac.aula012026.aula012026.presentation.controllers;

import com.senac.aula012026.aula012026.application.DTO.ClienteRequest;
import com.senac.aula012026.aula012026.application.DTO.ClienteResponse;
import com.senac.aula012026.aula012026.application.services.ClienteService;
import com.senac.aula012026.aula012026.domain.entities.Cliente;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clientes")
@Tag(name = "Clientes controller",description = "Controladora responsável por gerenciar os clientes!")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @GetMapping
    @Operation(summary = "Listar clientes",description = "Método para listar clientes por oficina")
    public ResponseEntity<List<ClienteResponse>> listarTodos(){
        return ResponseEntity.ok(clienteService.listarTodos());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar cliente",description = "Método para buscar cliente por id")
    public ResponseEntity<ClienteResponse> buscarPorId(@PathVariable Long id){
        var cliente = clienteService.buscarPorId(id);
        if(cliente == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(cliente);
    }

    @PostMapping
    @Operation(summary = "Criar cliente",description = "Método para criar cliente")
    public ResponseEntity<Long> salvar(@RequestBody ClienteRequest cliente){
        return ResponseEntity.ok(clienteService.salvar(cliente));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar cliente",description = "Método para atualizar cliente")
    public ResponseEntity<?> alterar(@PathVariable Long id, @RequestBody ClienteRequest cliente){
        var clienteBanco = clienteService.alterar(id, cliente);
        if(clienteBanco == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(clienteBanco);
    }
}
