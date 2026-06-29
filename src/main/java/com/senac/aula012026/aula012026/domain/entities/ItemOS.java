package com.senac.aula012026.aula012026.domain.entities;

import com.senac.aula012026.aula012026.application.DTO.ItemOSRequest;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "item_os")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemOS {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String descricao;
    private BigDecimal valor;
    private Integer quantidade;

    @ManyToOne
    @JoinColumn(name = "ordem_servico_id")
    private OrdemServico ordemServico;

    public ItemOS(ItemOSRequest request, OrdemServico ordemServico){
        this.descricao = request.descricao();
        this.valor = request.valor();
        this.quantidade = request.quantidade();
        this.ordemServico = ordemServico;
    }

}
