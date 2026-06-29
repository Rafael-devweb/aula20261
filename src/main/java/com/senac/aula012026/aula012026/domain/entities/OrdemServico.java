package com.senac.aula012026.aula012026.domain.entities;

import com.senac.aula012026.aula012026.application.DTO.OrdemServicoRequest;
import com.senac.aula012026.aula012026.domain.enuns.EnumStatusOS;
import com.senac.aula012026.aula012026.infra.ex.RegraNegocioException;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "ordem_servico")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrdemServico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String descricao;
    private BigDecimal valorTotal;

    @Enumerated(EnumType.STRING)
    private EnumStatusOS status = EnumStatusOS.NA_FILA;

    @ManyToOne
    @JoinColumn(name = "veiculo_id",referencedColumnName = "id")
    private Veiculo veiculo;

    @ManyToOne
    @JoinColumn(name = "oficina_id",referencedColumnName = "id")
    private Oficina oficina;

    @OneToMany(mappedBy = "ordemServico", cascade = CascadeType.ALL)
    private List<ItemOS> itensOS = new ArrayList<>();

    public OrdemServico(OrdemServicoRequest request, Oficina oficina, Veiculo veiculo){
        if(request.itens().isEmpty()){
            throw new RegraNegocioException("A OS deve ter pelo menos um item");
        }
        this.descricao = request.descricao();
        this.itensOS = new ArrayList<>(request.itens().stream().map(item -> new ItemOS(item, this)).toList());
        this.veiculo = veiculo;
        this.oficina = oficina;
        this.calcularTotal();
    }

    public void calcularTotal(){
        this.valorTotal = itensOS.stream().map(ItemOS::getValor).reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public void cancelar(){
        if(this.status == EnumStatusOS.CANCELADO){
            throw new RegraNegocioException("Ordem de serviço ja cancelada");
        }
        this.status = EnumStatusOS.CANCELADO;
    }

    public void atualizarStatus(EnumStatusOS status){
        validarNovoStatus(status);
        this.status = status;
    }

    private void validarNovoStatus(EnumStatusOS novoStatus) {
        if (this.status.equals(novoStatus)) {
            throw new RegraNegocioException("OS já tem esse status");
        }
        if (this.status.equals(EnumStatusOS.CANCELADO)) {
            throw new RegraNegocioException("OS já foi cancelada");
        }

        switch (novoStatus) {
            case EM_REPARO -> {
                if (this.status != EnumStatusOS.NA_FILA)
                    throw new RegraNegocioException("OS tem que estar na fila para ir para reparo");
            }
            case FINALIZADO -> {
                if (this.status != EnumStatusOS.EM_REPARO)
                    throw new RegraNegocioException("OS tem que estar em reparo para ser finalizada");
            }
            case RETIRADO -> {
                if (this.status != EnumStatusOS.FINALIZADO)
                    throw new RegraNegocioException("OS tem que estar finalizada para ser retirada");
            }
            case NA_FILA -> {
                throw new RegraNegocioException("OS não pode voltar para a fila");
            }
        }
    }


}
