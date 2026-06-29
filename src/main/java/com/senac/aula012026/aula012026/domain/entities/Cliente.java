package com.senac.aula012026.aula012026.domain.entities;

import com.senac.aula012026.aula012026.application.DTO.ClienteRequest;
import com.senac.aula012026.aula012026.domain.valueobject.CPF;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "cliente")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private CPF cpf;

    private String telefone;

    @ManyToOne
    @JoinColumn(name = "oficina_id", referencedColumnName = "id")
    private Oficina oficina;

    public Cliente(ClienteRequest request, Oficina oficina){
        this.nome = request.nome();
        this.cpf = new CPF(request.cpf());
        this.telefone = request.telefone();
        this.oficina = oficina;
    }
}
