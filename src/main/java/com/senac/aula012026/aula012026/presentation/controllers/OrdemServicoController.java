package com.senac.aula012026.aula012026.presentation.controllers;

import com.senac.aula012026.aula012026.application.DTO.OrdemServicoRequest;
import com.senac.aula012026.aula012026.application.DTO.OrdemServicoResponse;
import com.senac.aula012026.aula012026.application.DTO.OrdemServicoStatusRequest;
import com.senac.aula012026.aula012026.application.services.OrdemServicoService;
import com.senac.aula012026.aula012026.domain.enuns.EnumStatusOS;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ordens-servico")
@Tag(name = "Ordem de Serviço controller", description = "Controladora responsável por gerenciar as ordens de serviço!")
public class OrdemServicoController {

    @Autowired
    private OrdemServicoService ordemServicoService;

    @GetMapping
    @Operation(summary = "Listar ordens de serviço", description = "Método para listar todas as ordens de serviço da oficina logada")
    public ResponseEntity<List<OrdemServicoResponse>> listarTodos() {
        return ResponseEntity.ok(ordemServicoService.listarTodos());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar ordem de serviço por ID", description = "Método para buscar uma ordem de serviço específica pelo seu ID")
    public ResponseEntity<OrdemServicoResponse> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(ordemServicoService.listarPorId(id));
    }

    @PostMapping
    @Operation(summary = "Criar ordem de serviço", description = "Método responsável por criar uma nova ordem de serviço")
    public ResponseEntity<Void> salvar(@RequestBody OrdemServicoRequest request) {
        ordemServicoService.salvar(request);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/cancelar")
    @Operation(summary = "Cancelar ordem de serviço", description = "Método responsável por cancelar uma ordem de serviço")
    public ResponseEntity<Void> cancelar(@PathVariable Long id) {
        var result = ordemServicoService.cancelar(id);
        return result ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}/status")
    @Operation(summary = "Alterar status da ordem de serviço", description = "Método responsável por atualizar o status de uma ordem de serviço")
    public ResponseEntity<Void> alterarStatus(@PathVariable Long id, @RequestBody OrdemServicoStatusRequest request) {
        var result = ordemServicoService.alterarStatus(id, request);
        return result ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }
}
