package com.senac.aula012026.aula012026.presentation.controllers;

import com.senac.aula012026.aula012026.application.DTO.MarcaResponse;
import com.senac.aula012026.aula012026.application.DTO.ModeloResponse;
import com.senac.aula012026.aula012026.application.DTO.VeiculoRequest;
import com.senac.aula012026.aula012026.application.DTO.VeiculoResponse;
import com.senac.aula012026.aula012026.application.services.VeiculoService;
import com.senac.aula012026.aula012026.domain.entities.Veiculo;
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
    private VeiculoService veiculoService;

    @GetMapping
    @Operation(summary = "Listar veículos",description = "Método para listar veículos por oficina")
    public ResponseEntity<List<VeiculoResponse>> listarTodos(){
        return ResponseEntity.ok(veiculoService.listarTodos());
    }

    @GetMapping("/marcas")
    @Operation(summary = "Listar marcas", description = "Lista todas as marcas cadastradas no banco")
    public ResponseEntity<List<MarcaResponse>> listarMarcas() {
        return ResponseEntity.ok(veiculoService.listarMarcas());
    }

    @GetMapping("/marcas/{marcaId}/modelos")
    @Operation(summary = "Listar modelos", description = "Lista todos os modelos de uma determinada marca")
    public ResponseEntity<List<ModeloResponse>> listarModelos(@PathVariable Long marcaId) {
        return ResponseEntity.ok(veiculoService.listarModelosPorMarca(marcaId));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar veículo",description = "Método para buscar veículo por id")
    public ResponseEntity<VeiculoResponse> buscarPorId(@PathVariable Long id){
        var veiculo = veiculoService.buscarPorId(id);
        if(veiculo == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(veiculo);
    }

    @PostMapping
    @Operation(summary = "Criar veículo",description = "Método para criar veículo")
    public ResponseEntity<Long> salvar(@RequestBody VeiculoRequest veiculo){
        return ResponseEntity.ok(veiculoService.salvar(veiculo));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar veículo",description = "Método para atualizar veículo")
    public ResponseEntity<?> alterar(@PathVariable Long id, @RequestBody VeiculoRequest veiculo){
        var veiculoBanco = veiculoService.alterar(id, veiculo);
        if(veiculoBanco == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(veiculoBanco);
    }
}
