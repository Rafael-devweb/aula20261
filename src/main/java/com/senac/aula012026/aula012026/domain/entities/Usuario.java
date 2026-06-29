package com.senac.aula012026.aula012026.domain.entities;


import com.senac.aula012026.aula012026.application.DTO.UsuarioAdminRequest;
import com.senac.aula012026.aula012026.application.DTO.UsuarioOficinaRequest;
import com.senac.aula012026.aula012026.application.DTO.UsuarioRequest;
import com.senac.aula012026.aula012026.domain.enuns.EnumStatusUsuario;
import com.senac.aula012026.aula012026.domain.enuns.EnumTipoUsuario;
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

    @Enumerated(EnumType.STRING)
    private EnumTipoUsuario role;

    private EnumStatusUsuario status = EnumStatusUsuario.ATIVO;

    @ManyToOne
    @JoinColumn(name = "oficina_id", referencedColumnName = "id")
    private Oficina oficina;

    public Usuario(UsuarioAdminRequest request){
        this.nome = request.nome();
        this.email = request.email();
        this.senha = request.senha();
        this.role = EnumTipoUsuario.ADMINISTRADOR;
    }

    public Usuario(UsuarioRequest request, Oficina oficina){
        this.nome = request.nome();
        this.email = request.email();
        this.senha = request.senha();
        this.role = EnumTipoUsuario.FUNCIONARIO;
        this.oficina = oficina;
    }

    public Usuario(UsuarioOficinaRequest request, Oficina oficina){
        this.nome = "Admin Oficina - " + oficina.getNomeFantasia();
        this.email = request.email();
        this.senha = request.senha();
        this.role = EnumTipoUsuario.OFICINA;
        this.oficina = oficina;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + this.role.toString()));
    }

    @Override
    public @Nullable String getPassword() {
        return this.senha;
    }

    @Override
    public String getUsername() {return this.email;}
}
