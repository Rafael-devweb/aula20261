package com.senac.aula012026.aula012026.application.DTO;

public record DashboardStatsResponse(
        long totalOficinas,
        long totalUsuarios,
        long totalClientes,
        long totalVeiculos,
        long totalOS
) {
}
