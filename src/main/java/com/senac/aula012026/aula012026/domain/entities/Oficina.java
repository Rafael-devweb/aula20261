package com.senac.aula012026.aula012026.domain.entities;

import com.senac.aula012026.aula012026.application.DTO.OficinaRequest;
import com.senac.aula012026.aula012026.domain.enuns.EnumStatusOficina;
import com.senac.aula012026.aula012026.domain.valueobject.CNPJ;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "oficina")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Oficina {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String razaoSocial;
    private String nomeFantasia;
    private CNPJ cnpj;

    private EnumStatusOficina status = EnumStatusOficina.ATIVO;

    public Oficina(OficinaRequest request){
        this.razaoSocial = request.razaoSocial();
        this.nomeFantasia = request.nomeFantasia();
        this.cnpj = new CNPJ(request.cnpj());
    }

}
