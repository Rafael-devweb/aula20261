package com.senac.aula012026.aula012026.controllers;

import com.senac.aula012026.aula012026.model.entities.Cliente;
import com.senac.aula012026.aula012026.model.repository.ClienteRepository;
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
    private ClienteRepository clienteRepository;

    @GetMapping
    @Operation(summary = "Listar clientes",description = "Método para listar clientes por oficina")
    public ResponseEntity<List<Cliente>> listarTodos(@RequestParam Long oficinaId){
        return ResponseEntity.ok(clienteRepository.findByOficinaId(oficinaId));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar cliente",description = "Método para buscar cliente por id")
    public ResponseEntity<Cliente> buscarPorId(@PathVariable Long id, @RequestParam Long oficinaId){
        var cliente = clienteRepository.findById(id).orElse(null);
        if(cliente == null){
            return ResponseEntity.notFound().build();
        }

        if(!oficinaId.equals(cliente.getOficinaId())){
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(cliente);
    }

    @PostMapping
    @Operation(summary = "Criar cliente",description = "Método para criar cliente")
    public ResponseEntity<Long> salvar(@RequestBody Cliente cliente){
        return ResponseEntity.ok(clienteRepository.save(cliente).getId());
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar cliente",description = "Método para atualizar cliente")
    public ResponseEntity<?> alterar(@PathVariable Long id, @RequestParam Long oficinaId, @RequestBody Cliente cliente){
        var clienteBanco = clienteRepository.findById(id).orElse(null);
        if(clienteBanco == null){
            return ResponseEntity.notFound().build();
        }

        if(!oficinaId.equals(clienteBanco.getOficinaId())){
            return ResponseEntity.notFound().build();
        }

        clienteBanco.setNome(cliente.getNome());
        clienteBanco.setTelefone(cliente.getTelefone());
        clienteBanco.setOficinaId(clienteBanco.getOficinaId());

        clienteRepository.save(clienteBanco);
        return ResponseEntity.ok(clienteBanco);
    }
}
