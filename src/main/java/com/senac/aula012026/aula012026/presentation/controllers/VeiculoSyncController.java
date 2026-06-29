package com.senac.aula012026.aula012026.presentation.controllers;

import com.senac.aula012026.aula012026.application.DTO.SyncRequest;
import com.senac.aula012026.aula012026.application.DTO.SyncResultDTO;
import com.senac.aula012026.aula012026.application.services.VeiculoSyncService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/veiculos/sync")
@RequiredArgsConstructor
@Tag(name = "Sincronizar Marca e Modelos Veiculos")
public class VeiculoSyncController {

    private final VeiculoSyncService syncService;

    @PostMapping("/brasil")
    @Operation(summary = "Sincronizar dados Brasil", description = "Sincroniza marca e modelos de carros do brasil a partir dos anos 2000 usando as 10 marcas mais famosas no pais")
    public ResponseEntity<SyncResultDTO> sincronizarBrasil(@RequestBody SyncRequest request) {
        return ResponseEntity.ok(syncService.sincronizarMarcasBrasil(request));
    }
}
