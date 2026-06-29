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

    // As 10 marcas mais vendidas no Brasil com seus IDs na NHTSA
    private static final List<MarcaRef> MARCAS_BRASIL = List.of(
            new MarcaRef(474,  "Chevrolet"),
            new MarcaRef(448,  "Fiat"),
            new MarcaRef(482,  "Volkswagen"),
            new MarcaRef(476,  "Ford"),
            new MarcaRef(499,  "Toyota"),
            new MarcaRef(475,  "Hyundai"),
            new MarcaRef(467,  "Jeep"),
            new MarcaRef(497,  "Renault"),
            new MarcaRef(479,  "Honda"),
            new MarcaRef(492,  "Nissan")
    );


    private record MarcaRef(int makeId, String nome) {}

    @Transactional
    public SyncResultDTO sincronizarMarcasBrasil(SyncRequest request) {
        if(!secretKey.equals(request.secretKey())){
            throw new IllegalArgumentException("Acesso invalido!");
        }

        // Nomes que a gente quer — o ID vai ser resolvido pela NHTSA
        Set<String> nomesMarcasBrasil = Set.of(
                "Chevrolet", "Fiat", "Volkswagen", "Ford", "Toyota",
                "Hyundai", "Jeep", "Renault", "Honda", "Nissan"
        );

        // Busca todas as marcas e filtra pelos nomes
        List<NhtsaMakeDTO> marcasFiltradas = nhtsaClient.buscarTodasMarcas()
                .stream()
                .filter(m -> nomesMarcasBrasil.stream()
                        .anyMatch(nome -> nome.equalsIgnoreCase(m.Make_Name())))
                .toList();

        // Loga pra você confirmar os IDs reais
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
