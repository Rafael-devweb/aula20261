package com.senac.aula012026.aula012026.model.entities;


import com.senac.aula012026.aula012026.model.enuns.EnumStatusUsuario;
import com.senac.aula012026.aula012026.model.enuns.EnumTipoUsuario;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "usuario")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String email;

    private String senha;

    private String role;

    private Long oficinaId;

    private EnumStatusUsuario status = EnumStatusUsuario.ATIVO;

    private EnumTipoUsuario tipo = EnumTipoUsuario.FUNCIONARIO;




    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(this.role));
    }

    @Override
    public @Nullable String getPassword() {
        return this.senha;
    }

    @Override
    public String getUsername() {return this.email;}
}
