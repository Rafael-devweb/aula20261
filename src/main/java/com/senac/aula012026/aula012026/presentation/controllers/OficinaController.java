package com.senac.aula012026.aula012026.presentation.controllers;

import com.senac.aula012026.aula012026.application.DTO.*;
import com.senac.aula012026.aula012026.application.services.OficinaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/oficina")
@Tag(name = "Oficina Controller", description = "Controladora da entidade oficina")
public class OficinaController {

    @Autowired
    private OficinaService oficinaService;

    @PostMapping
    @Operation(summary = "Salvar uma oficina", description = "Salva uma oficina e um usuario de gestao")
    public ResponseEntity<?> salvar(@RequestBody OficinaRequest oficina){
        oficinaService.salvar(oficina);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    @Operation(summary = "Listar todas as oficinas")
    public ResponseEntity<List<OficinaResponse>> listar() {
        return ResponseEntity.ok(oficinaService.listarTodas());
    }

    @GetMapping("/stats")
    @Operation(summary = "Obter estatísticas do sistema")
    public ResponseEntity<DashboardStatsResponse> obterStats() {
        return ResponseEntity.ok(oficinaService.obterEstatisticas());
    }

    @PostMapping("/vincular/{oficinaId}")
    @Operation(summary = "Vincular a oficina ao administrador logado")
    public ResponseEntity<?> vincular(@PathVariable Long oficinaId) {
        var usuario = (UsuarioLogado) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        var novoToken = oficinaService.vincularOficina(usuario.id(), oficinaId);
        return ResponseEntity.ok(new TokenResponse(novoToken));
    }
}
