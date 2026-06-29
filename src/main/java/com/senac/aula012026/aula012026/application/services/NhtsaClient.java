package com.senac.aula012026.aula012026.application.services;

import com.senac.aula012026.aula012026.application.DTO.NhtsaMakeDTO;
import com.senac.aula012026.aula012026.application.DTO.NhtsaMakesResponse;
import com.senac.aula012026.aula012026.application.DTO.NhtsaModelDTO;
import com.senac.aula012026.aula012026.application.DTO.NhtsaModelsResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;

@Service
public class NhtsaClient {

    private final RestClient restClient;

    public NhtsaClient() {
        this.restClient = RestClient.builder()
                .baseUrl("https://vpic.nhtsa.dot.gov/api/vehicles")
                .build();
    }

    public List<NhtsaMakeDTO> buscarTodasMarcas() {
        NhtsaMakesResponse response = restClient.get()
                .uri("/GetAllMakes?format=json")
                .retrieve()
                .body(NhtsaMakesResponse.class);

        return response != null ? response.Results() : List.of();
    }

    public List<NhtsaModelDTO> buscarModelosPorMarca(Integer makeId) {
        NhtsaModelsResponse response = restClient.get()
                .uri("/GetModelsForMakeId/{id}?format=json", makeId)
                .retrieve()
                .body(NhtsaModelsResponse.class);

        return response != null ? response.Results() : List.of();
    }
}
