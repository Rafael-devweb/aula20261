package com.senac.aula012026.aula012026.controllers;

import com.senac.aula012026.aula012026.model.entities.Mesa;
import com.senac.aula012026.aula012026.model.enuns.EnumStatusMesa;
import com.senac.aula012026.aula012026.model.repository.MesaRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/mesas")
@Tag(name = "Mesas controller",description = "Controladora responsável por gerenciar as mesas!")
public class MesaController {

    @Autowired
    private MesaRepository mesaRepository;

    @GetMapping
    @Operation(summary = "Listar mesas",description = "Método para listar mesas por restaurante")
    public ResponseEntity<List<Mesa>> listarTodos(@RequestParam Long restauranteId){
        return ResponseEntity.ok(mesaRepository.findByRestauranteId(restauranteId));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar mesa",description = "Método para buscar mesa por id")
    public ResponseEntity<Mesa> buscarPorId(@PathVariable Long id){
        return ResponseEntity.ok(mesaRepository.findById(id).orElse(null));
    }

    @PostMapping
    @Operation(summary = "Criar mesa",description = "Método para criar mesa")
    public ResponseEntity<Long> salvar(@RequestBody Mesa mesa){
        if(mesa.getStatus() == null){
            mesa.setStatus(EnumStatusMesa.LIVRE);
        }

        return ResponseEntity.ok(mesaRepository.save(mesa).getId());
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar mesa",description = "Método para atualizar mesa")
    public ResponseEntity<?> alterar(@PathVariable Long id, @RequestBody Mesa mesa){
        var mesaBanco = mesaRepository.findById(id).orElse(null);
        if(mesaBanco == null){
            return ResponseEntity.notFound().build();
        }

        mesaBanco.setNumero(mesa.getNumero());
        mesaBanco.setStatus(mesa.getStatus());
        mesaBanco.setRestauranteId(mesa.getRestauranteId());
        mesaRepository.save(mesaBanco);

        return ResponseEntity.ok(mesaBanco);
    }

    @PutMapping("/{id}/status")
    @Operation(summary = "Alterar status da mesa",description = "Método para alterar status livre/ocupada")
    public ResponseEntity<?> alterarStatus(@PathVariable Long id){
        var mesaBanco = mesaRepository.findById(id).orElse(null);
        if(mesaBanco == null){
            return ResponseEntity.notFound().build();
        }

        if(mesaBanco.getStatus() == EnumStatusMesa.OCUPADA){
            mesaBanco.setStatus(EnumStatusMesa.LIVRE);
        }else{
            mesaBanco.setStatus(EnumStatusMesa.OCUPADA);
        }

        mesaRepository.save(mesaBanco);
        return ResponseEntity.ok(mesaBanco);
    }
}
