package com.senac.aula012026.aula012026.controllers;

import com.senac.aula012026.aula012026.model.entities.Veiculo;
import com.senac.aula012026.aula012026.model.repository.VeiculoRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/veiculos")
@Tag(name = "Veículos controller",description = "Controladora responsável por gerenciar os veículos!")
public class VeiculoController {

    @Autowired
    private VeiculoRepository veiculoRepository;

    @GetMapping
    @Operation(summary = "Listar veículos",description = "Método para listar veículos por oficina")
    public ResponseEntity<List<Veiculo>> listarTodos(@RequestParam Long oficinaId){
        return ResponseEntity.ok(veiculoRepository.findByOficinaId(oficinaId));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar veículo",description = "Método para buscar veículo por id")
    public ResponseEntity<Veiculo> buscarPorId(@PathVariable Long id, @RequestParam Long oficinaId){
        var veiculo = veiculoRepository.findById(id).orElse(null);
        if(veiculo == null){
            return ResponseEntity.notFound().build();
        }

        if(!oficinaId.equals(veiculo.getOficinaId())){
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(veiculo);
    }

    @PostMapping
    @Operation(summary = "Criar veículo",description = "Método para criar veículo")
    public ResponseEntity<Long> salvar(@RequestBody Veiculo veiculo){
        return ResponseEntity.ok(veiculoRepository.save(veiculo).getId());
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar veículo",description = "Método para atualizar veículo")
    public ResponseEntity<?> alterar(@PathVariable Long id, @RequestParam Long oficinaId, @RequestBody Veiculo veiculo){
        var veiculoBanco = veiculoRepository.findById(id).orElse(null);
        if(veiculoBanco == null){
            return ResponseEntity.notFound().build();
        }

        if(!oficinaId.equals(veiculoBanco.getOficinaId())){
            return ResponseEntity.notFound().build();
        }

        veiculoBanco.setPlaca(veiculo.getPlaca());
        veiculoBanco.setMarca(veiculo.getMarca());
        veiculoBanco.setModelo(veiculo.getModelo());
        veiculoBanco.setAno(veiculo.getAno());
        veiculoBanco.setClienteId(veiculo.getClienteId());
        veiculoBanco.setOficinaId(veiculoBanco.getOficinaId());

        veiculoRepository.save(veiculoBanco);
        return ResponseEntity.ok(veiculoBanco);
    }
}
