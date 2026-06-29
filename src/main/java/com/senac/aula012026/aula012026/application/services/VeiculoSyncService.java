package com.senac.aula012026.aula012026.application.services;

import com.senac.aula012026.aula012026.application.DTO.NhtsaMakeDTO;
import com.senac.aula012026.aula012026.application.DTO.NhtsaModelDTO;
import com.senac.aula012026.aula012026.application.DTO.SyncRequest;
import com.senac.aula012026.aula012026.application.DTO.SyncResultDTO;
import com.senac.aula012026.aula012026.domain.entities.Marca;
import com.senac.aula012026.aula012026.domain.entities.Modelo;
import com.senac.aula012026.aula012026.domain.repository.MarcaRepository;
import com.senac.aula012026.aula012026.domain.repository.ModeloRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class VeiculoSyncService {

    private final NhtsaClient nhtsaClient;
    private final MarcaRepository marcaRepository;
    private final ModeloRepository modeloRepository;

    @Value("${spring.secretKey}")
    private String secretKey;


    @Transactional
    public SyncResultDTO sincronizarMarcasBrasil(SyncRequest request) {
        if(!secretKey.equals(request.secretKey())){
            throw new IllegalArgumentException("Acesso invalido!");
        }

        Set<String> nomesMarcasBrasil = Set.of(
                "Chevrolet", "Fiat", "Volkswagen", "Ford", "Toyota",
                "Hyundai", "Jeep", "Renault", "Honda", "Nissan"
        );

        List<NhtsaMakeDTO> marcasFiltradas = nhtsaClient.buscarTodasMarcas()
                .stream()
                .filter(m -> nomesMarcasBrasil.stream()
                        .anyMatch(nome -> nome.equalsIgnoreCase(m.Make_Name())))
                .toList();

        marcasFiltradas.forEach(m ->
                System.out.println("Marca encontrada: [" + m.Make_Name() + "] ID: " + m.Make_ID()));

        int marcasSalvas = 0, modelosSalvos = 0;

        for (NhtsaMakeDTO makeDTO : marcasFiltradas) {
            Marca marca = marcaRepository.findByNhtsaMakeId(makeDTO.Make_ID())
                    .orElseGet(() -> {
                        Marca nova = new Marca();
                        nova.setNome(makeDTO.Make_Name());
                        nova.setNhtsaMakeId(makeDTO.Make_ID());
                        return marcaRepository.save(nova);
                    });

            marcasSalvas++;


            List<NhtsaModelDTO> modelosDaNhtsa = nhtsaClient.buscarModelosPorMarca(makeDTO.Make_ID());

            for (NhtsaModelDTO dto : modelosDaNhtsa) {

                if (modeloRepository.existsByNomeIgnoreCaseAndMarca(dto.Model_Name(), marca)) continue;

                Modelo modelo = new Modelo();
                modelo.setNome(dto.Model_Name());
                modelo.setMarca(marca);
                modeloRepository.save(modelo);
                modelosSalvos++;
            }
        }

        return new SyncResultDTO(marcasSalvas, modelosSalvos);
    }
}
