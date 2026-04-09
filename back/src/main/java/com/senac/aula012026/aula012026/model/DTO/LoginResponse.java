package com.senac.aula012026.aula012026.model.DTO;

public record LoginResponse(String token, Long id, String nome, String email, String status, String tipo, Long restauranteId) {
}
