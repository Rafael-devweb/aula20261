package com.senac.aula012026.aula012026.model.repository;

import com.senac.aula012026.aula012026.model.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface UsuarioRepository extends JpaRepository<Usuario,Long> {
    Optional<Usuario> findByEmailAndSenha(String email, String senha);

    List<Usuario> findByOficinaId(Long oficinaId);

    boolean existUsuarioByEmailContainingSenha(String email, String senha );
}
