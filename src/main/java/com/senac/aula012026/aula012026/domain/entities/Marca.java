package com.senac.aula012026.aula012026.domain.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "marca")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Marca {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String nome;

    @Column(name = "nhtsa_make_id", unique = true)
    private Integer nhtsaMakeId;

    @OneToMany(mappedBy = "marca", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Modelo> modelos = new ArrayList<>();
}
