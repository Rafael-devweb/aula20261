package com.senac.aula012026.aula012026.application.DTO;

import com.senac.aula012026.aula012026.domain.enuns.EnumStatusOS;

public record OrdemServicoStatusRequest(
        EnumStatusOS status
) {
}
