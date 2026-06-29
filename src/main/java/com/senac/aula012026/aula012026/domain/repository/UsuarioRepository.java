package com.senac.aula012026.aula012026.domain.repository;

import com.senac.aula012026.aula012026.domain.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface UsuarioRepository extends JpaRepository<Usuario,Long> {
    boolean existsUsuarioByEmailAndSenha(String email, String senha);
    List<Usuario> findAllByOficinaId(Long id);
    Optional<Usuario> findByIdAndOficinaId(Long id, Long oficinaId);
    Optional<Usuario> findByEmail(String email);
}
