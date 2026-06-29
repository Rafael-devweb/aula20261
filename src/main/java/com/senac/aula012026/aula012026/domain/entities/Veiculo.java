package com.senac.aula012026.aula012026.domain.entities;

import com.senac.aula012026.aula012026.application.DTO.VeiculoRequest;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "veiculo")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Veiculo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String placa;
    private String ano;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "marca_id")
    private Marca marca;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "modelo_id")
    private Modelo modelo;

    @ManyToOne
    @JoinColumn(name = "cliente_id",referencedColumnName = "id")
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "oficina_id", referencedColumnName = "id")
    private Oficina oficina;

    public Veiculo(VeiculoRequest request, Oficina oficina, Cliente cliente, Modelo modelo, Marca marca){
        this.placa = request.placa();
        this.ano = request.ano();
        this.cliente = cliente;
        this.modelo = modelo;
        this.marca = marca;
        this.oficina = oficina;
    }
}
