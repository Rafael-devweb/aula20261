package com.senac.aula012026.aula012026.application.DTO;

import com.senac.aula012026.aula012026.domain.entities.OrdemServico;
import com.senac.aula012026.aula012026.domain.enuns.EnumStatusOS;

import java.math.BigDecimal;
import java.util.List;

public record OrdemServicoResponse(
        VeiculoResponse veiculo,
        String cliente,
        String descricao,
        Long id,
        EnumStatusOS status,
        BigDecimal valorTotal,
        List<ItemOSResponse> itens
) {
    public OrdemServicoResponse(OrdemServico os){
        this(
                new VeiculoResponse(os.getVeiculo()),
                os.getVeiculo().getCliente().getNome(),
                os.getDescricao(),
                os.getId(),
                os.getStatus(),
                os.getValorTotal(),
                os.getItensOS().stream().map(ItemOSResponse::new).toList()
        );
    }
}
