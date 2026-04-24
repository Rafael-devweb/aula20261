package com.senac.aula012026.aula012026.model.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "token")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Token {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

      private Long id;

      private String token;


      @ManyToOne
      @JoinColumn(name = "usaurio_id",referencedColumnName = "id")

      private Usuario usuario;

      private Token(String toke, Usuario usuario)


  }





