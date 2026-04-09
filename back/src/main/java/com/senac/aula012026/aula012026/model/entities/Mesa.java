package com.senac.aula012026.aula012026.model.entities;

import com.senac.aula012026.aula012026.model.enuns.EnumStatusMesa;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "mesa")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Mesa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String numero;

    @Enumerated(EnumType.STRING)
    private EnumStatusMesa status = EnumStatusMesa.LIVRE;

    private Long restauranteId;
}
